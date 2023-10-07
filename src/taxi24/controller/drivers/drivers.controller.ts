import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { DriverDto } from 'src/taxi24/dtos/driver.dto';
import { DriversService } from 'src/taxi24/services/drivers/drivers.service';
import { Driver } from '../../entities/driver.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Drivers')
@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Post()
  async create(@Body() createDriverDto: DriverDto) {
    return await this.driversService.create(createDriverDto);
  }

  @Get()
  getAllDrivers() {
    return this.driversService.getAllDrivers();
  }

  @Get('/available')
  getAvailableDrivers(): Promise<Driver[]> {
    return this.driversService.getAvailableDrivers();
  }

  @Get('nearby')
  findNearbyDrivers(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number,
  ): Promise<Driver[]> {
    return this.driversService.findDriversWithinRadius(lat, lng, radius);
  }

  @Get(':id')
  getDriverById(@Param('id') id: number): Promise<Driver> {
    return this.driversService.getDriverById(id);
  }
}
