// src/contact/contact.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async importContacts(contacts: CreateContactDto[], userId: string) {
    const data = contacts.map((contact) => ({
      ...contact,
      userId,
    }));

    // Optional: deduplicate contacts
    await this.prisma.contact.createMany({
      data,
      skipDuplicates: true,
    });

    return { message: 'Contacts imported successfully' };
  }
}
