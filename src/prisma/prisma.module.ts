// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
// import { PrismaService } from './prisma.service'; // Make sure this file exists

@Global() // This makes PrismaService available in the entire app without importing the module again
@Module({
  providers: [PrismaService], // Registers PrismaService as a provider
  exports: [PrismaService], // Makes PrismaService usable outside this module
})
export class PrismaModule {}
