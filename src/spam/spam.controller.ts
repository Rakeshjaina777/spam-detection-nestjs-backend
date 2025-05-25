// src/spam/spam.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { SpamService } from './spam.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { ReportSpamDto } from './dto/report-spam.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Spam')
@ApiBearerAuth()
@Controller('spam')
@UseGuards(JwtAuthGuard)
export class SpamController {
  constructor(private readonly spamService: SpamService) {}

  @Post('report')
  async report(@Body() dto: ReportSpamDto, @Req() req: Request) {
    const user = req.user as any;
    return this.spamService.report(dto, user.userId);
  }

  @Get('count')
  async getCount(@Query('phone') phone: string) {
    return this.spamService.getSpamCount(phone);
  }
}
