import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Passenger } from 'src/taxi24/entities/passenger.entity';
import { Trip } from 'src/taxi24/entities/trip.entity';
import { Driver } from 'src/taxi24/entities/driver.entity';
import { TripDto } from 'src/taxi24/dtos/trip.dto';
import { number } from 'joi';

@Injectable()
export class TripsService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>,
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
  ) {}

  async createTrip(createTripDto: TripDto) {
    const driverData = new TripDto();
    driverData.driverId = createTripDto.driverId;
    driverData.passengerId = createTripDto.passengerId;

    const driver = await this.findOneDriver(driverData.driverId);
    const passenger = await this.findOnePassenger(driverData.passengerId);

    const trip = new Trip();
    trip.driver = driver;
    trip.passenger = passenger;

    return this.tripRepository.save(trip);
  }

  async findOneDriver(id: number) {
    const driver = await this.driverRepository.findOne({
      where: { id },
    });
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }
    return driver;
  }

  async findOnePassenger(id: number) {
    const passenger = await this.passengerRepository.findOne({
      where: { id },
    });
    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }

    return passenger;
  }

  async getActiveTrips(): Promise<Trip[]> {
    return await this.tripRepository.find({
      where: { status: 'active' },
      relations: ['driver', 'passenger'],
    });
  }

  async completeTrip(id: number, newStatus: string): Promise<Trip> {
    const trip = await this.tripRepository.findOne({
      where: { id },
      relations: ['driver', 'passenger'],
    });
    if (!trip) {
      throw new Error('Trip not found'); // Puedes personalizar esta excepción según tus necesidades
    }
    trip.status = newStatus;
    return await this.tripRepository.save(trip);
  }
}
