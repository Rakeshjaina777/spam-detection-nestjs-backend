import { Module } from '@nestjs/common';
import { SpamController } from './spam.controller';
import { SpamService } from './spam.service';

@Module({
  controllers: [SpamController],
  providers: [SpamService]
})
export class SpamModule {}
