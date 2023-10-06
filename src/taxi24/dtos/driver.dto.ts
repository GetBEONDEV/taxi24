import { IsString, IsNotEmpty, IsDecimal } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class DriverDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'driver name' })
  name: string;

  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({ description: 'location latitude' })
  latitude: number;

  @IsDecimal()
  @IsNotEmpty()
  @ApiProperty({ description: 'location longitude' })
  longitude: number;

  @IsString()
  @ApiProperty({ description: 'driver status' })
  status: string;
}

export class UpdateDriverDto extends PartialType(DriverDto) {}
