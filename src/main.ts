// src/main.ts
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpErrorFilter } from './common/filters/http-exception.filter';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Spam Detection API')
    .setDescription('REST API for spam phone number detection')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, doc);



  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips out properties not in DTO
      forbidNonWhitelisted: true, // throws error for unknown props
      transform: true, // auto-transforms payloads to DTO classes
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());


  
app.useGlobalGuards(new JwtAuthGuard(), new RolesGuard(new Reflector()));
app.useGlobalFilters(new HttpErrorFilter());

  await app.listen(3000);
}
bootstrap();
