import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PassengerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'passenger name' })
  name: string;
}

export class UpdatePassengerDto extends PartialType(PassengerDto) {}
