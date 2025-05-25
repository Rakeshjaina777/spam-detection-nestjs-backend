// src/search/search.controller.ts
import { Controller, Get, Query, UseGuards, Req } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('Search')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('name')
  async searchByName(@Query('query') query: string, @Req() req: Request) {
    const user = req.user as any;
    return this.searchService.searchByName(query, user.userId);
  }

  @Get('phone')
  async searchByPhone(@Query('phone') phone: string, @Req() req: Request) {
    const user = req.user as any;
    return this.searchService.searchByPhone(phone, user.userId);
  }
}
