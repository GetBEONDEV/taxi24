import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class InvoiceDto {
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'Trip amount' })
  amount: number;
}

export class UpdateInvoiceDto extends PartialType(InvoiceDto) {}
