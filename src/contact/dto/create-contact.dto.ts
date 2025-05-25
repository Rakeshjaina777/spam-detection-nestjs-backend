// src/contact/dto/create-contact.dto.ts
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateContactDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
