import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DriversService } from './taxi24/services/drivers/drivers.service';
import { getConnection } from 'typeorm';
import { PassengersService } from './taxi24/services/passengers/passengers.service';
import { TripsService } from './taxi24/services/trips/trips.service';

async function crearDefaultData() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const driverService = app.get(DriversService);
  await driverService.seedDataDriver();

  const passengerService = app.get(PassengersService);
  await passengerService.seedDataPassenger();

  const tripService = app.get(TripsService);
  await tripService.seedDataTrip();

  await app.close();
  await getConnection().close();
}

crearDefaultData();
