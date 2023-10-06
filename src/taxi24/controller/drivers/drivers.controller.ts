import { Controller, Get } from '@nestjs/common';
import { DriversService } from 'src/taxi24/services/drivers/drivers.service';

@Controller('drivers')
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Get()
  getAllDrivers() {
    return this.driversService.getAllDrivers();
  }
}
