// src/search/search.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchByName(query: string, userId: string) {
    const registeredUsers = await this.prisma.user.findMany({
      where: {
        name: { contains: query, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        contacts: {
          where: { phone: { not: null } },
        },
      },
    });

    const result: Array<{
      name: string;
      phone: string;
      spamCount: number;
      email?: string;
    }> = [];

    for (const user of registeredUsers) {
      const spamCount = await this.prisma.spamReport.count({
        where: { phone: user.phone },
      });

      // check if searcher is in their contacts
      const isInContacts = await this.prisma.contact.findFirst({
        where: {
          userId: user.id,
          phone: (await this.prisma.user.findUnique({ where: { id: userId } }))
            ?.phone,
        },
      });

      result.push({
        name: user.name,
        phone: user.phone,
        spamCount,
        email: isInContacts ? user.email : undefined,
      });
    }

    // Sort: name starts with query first, then contains
    return result.sort((a, b) => {
      const aStarts = a.name.toLowerCase().startsWith(query.toLowerCase());
      const bStarts = b.name.toLowerCase().startsWith(query.toLowerCase());
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });
  }

  async searchByPhone(phone: string, searcherUserId: string) {
    const results: Array<{
      name: string;
      phone: string;
      spamCount: number;
      email?: string;
    }> = [];

    const registeredUser = await this.prisma.user.findUnique({
      where: { phone },
    });

    const spamCount = await this.prisma.spamReport.count({
      where: { phone },
    });

    // CASE 1: The phone belongs to a registered user
    if (registeredUser) {
      const searcher = await this.prisma.user.findUnique({
        where: { id: searcherUserId },
      });

      const isInContacts = await this.prisma.contact.findFirst({
        where: {
          userId: registeredUser.id,
          phone: searcher?.phone,
        },
      });

      results.push({
        name: registeredUser.name,
        phone: registeredUser.phone,
        email: isInContacts ? registeredUser.email : undefined,
        spamCount,
      });

      return results;
    }

    // CASE 2: The phone is only in contacts (not registered)
    const contactRecords = await this.prisma.contact.findMany({
      where: { phone },
    });

    for (const contact of contactRecords) {
      results.push({
        name: contact.name,
        phone: contact.phone,
        spamCount,
      });
    }

    return results;
  }
}
