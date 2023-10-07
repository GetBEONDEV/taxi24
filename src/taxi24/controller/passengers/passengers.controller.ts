import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { PassengerDto } from 'src/taxi24/dtos/passenger.dto';
import { Driver } from 'src/taxi24/entities/driver.entity';
import { Passenger } from 'src/taxi24/entities/passenger.entity';
import { PassengersService } from 'src/taxi24/services/passengers/passengers.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Passengers')
@Controller('passengers')
export class PassengersController {
  constructor(private passengerService: PassengersService) {}
  @Post()
  create(@Body() createPassengerDto: PassengerDto) {
    return this.passengerService.createPassenger(createPassengerDto);
  }

  @Get()
  getAll(): Promise<Passenger[]> {
    return this.passengerService.getAllPassengers();
  }

  @Get('/request-trip')
  getNearbyDrivers(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ): Promise<Driver[]> {
    return this.passengerService.getNearestDrivers(lat, lng);
  }

  @Get('/:id')
  getOne(@Param('id') id: number): Promise<Passenger> {
    return this.passengerService.getPassengerById(id);
  }
}
