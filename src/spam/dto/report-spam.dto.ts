// src/spam/dto/report-spam.dto.ts
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ReportSpamDto {
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
