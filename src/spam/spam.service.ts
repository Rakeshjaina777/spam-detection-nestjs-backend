// src/spam/spam.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReportSpamDto } from './dto/report-spam.dto';

@Injectable()
export class SpamService {
  constructor(private prisma: PrismaService) {}

  async report(dto: ReportSpamDto, userId: string) {
    const existing = await this.prisma.spamReport.findUnique({
      where: {
        phone_userId: {
          phone: dto.phone,
          userId,
        },
      },
    });

    if (existing) throw new ConflictException('Already reported as spam');

    await this.prisma.spamReport.create({
      data: {
        phone: dto.phone,
        userId,
      },
    });

    return { message: 'Spam reported successfully' };
  }

  async getSpamCount(phone: string) {
    const count = await this.prisma.spamReport.count({
      where: { phone },
    });

    return { phone, spamCount: count };
  }
}
