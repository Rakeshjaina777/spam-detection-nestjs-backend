// src/auth/dto/register.dto.ts
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
