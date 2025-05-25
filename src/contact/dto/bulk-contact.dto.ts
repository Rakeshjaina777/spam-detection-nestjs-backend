// src/contact/dto/bulk-contact.dto.ts
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { CreateContactDto } from './create-contact.dto';

export class BulkContactDto {
  @ValidateNested({ each: true })
  @Type(() => CreateContactDto)
  contacts: CreateContactDto[];
}
