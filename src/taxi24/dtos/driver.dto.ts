import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class DriverDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'driver name' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'location latitude' })
  latitude: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'location longitude' })
  longitude: number;

  @IsString()
  @ApiProperty({ description: 'driver status' })
  status: string;
}

export class UpdateDriverDto extends PartialType(DriverDto) {}
