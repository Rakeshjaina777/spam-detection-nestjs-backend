import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
// import { PrismaModule } from './prisma/prisma.module'; // Commented out due to missing module
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { SpamModule } from './spam/spam.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ContactModule,
    SpamModule,
    SearchModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
