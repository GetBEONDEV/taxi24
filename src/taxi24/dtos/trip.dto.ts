import { IsNotEmpty, IsInt, IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class TripDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'driver id' })
  driverId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'passenger id' })
  passengerId: number;

  @IsString()
  @ApiProperty({ description: 'driver status' })
  status: string;
}

export class UpdateTripDto extends PartialType(TripDto) {}
