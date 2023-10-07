import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { TripDto, UpdateTripDto } from 'src/taxi24/dtos/trip.dto';
import { TripsService } from 'src/taxi24/services/trips/trips.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private tripService: TripsService) {}

  @Post()
  create(@Body() createTripDto: TripDto) {
    return this.tripService.createTrip(createTripDto);
  }

  @Get('active')
  getActiveTrips() {
    return this.tripService.getActiveTrips();
  }

  @Put(':id/status')
  changeStatus(
    @Param('id') id: number,
    @Body() changeStatusDto: UpdateTripDto,
  ) {
    return this.tripService.completeTrip(id, changeStatusDto.status);
  }
}
