import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriversController } from './controller/drivers/drivers.controller';
import { TripsController } from './controller/trips/trips.controller';
import { PassengersController } from './controller/passengers/passengers.controller';
import { InvoicesController } from './controller/invoices/invoices.controller';

import { DriversService } from './services/drivers/drivers.service';
import { TripsService } from './services/trips/trips.service';
import { PassengersService } from './services/passengers/passengers.service';
import { InvoicesService } from './services/invoices/invoices.service';

import { Driver } from './entities/driver.entity';
import { Trip } from './entities/trip.entity';
import { Passenger } from './entities/passenger.entity';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver, Trip, Passenger, Invoice])],
  controllers: [
    DriversController,
    TripsController,
    PassengersController,
    InvoicesController,
  ],
  providers: [DriversService, TripsService, PassengersService, InvoicesService],
  exports: [TypeOrmModule],
})
export class Taxi24Module {}
