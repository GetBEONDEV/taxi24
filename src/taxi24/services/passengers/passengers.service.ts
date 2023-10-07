import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerDto } from 'src/taxi24/dtos/passenger.dto';
import { Driver } from 'src/taxi24/entities/driver.entity';
import { Passenger } from 'src/taxi24/entities/passenger.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PassengersService {
  constructor(
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Passenger)
    private passengerRepository: Repository<Passenger>,
  ) {}

  async createPassenger(createPassengerDto: PassengerDto): Promise<Passenger> {
    const passenger = new Passenger();
    passenger.name = createPassengerDto.name;
    return this.passengerRepository.save(passenger);
  }

  async getAllPassengers(): Promise<Passenger[]> {
    return await this.passengerRepository.find({
      relations: ['trips', 'trips.invoice'],
    });
  }

  async getPassengerById(id: number): Promise<Passenger> {
    const passenger = await this.passengerRepository.findOne({
      where: { id },
      relations: ['trips'],
    });

    if (!passenger) {
      throw new NotFoundException(`Passenger with ID ${id} not found`);
    }

    return passenger;
  }

  async getNearestDrivers(lat: number, lng: number): Promise<Driver[]> {
    return await this.driverRepository.query(`
        SELECT * 
        FROM driver
        ORDER BY SQRT(
            POW(69.1 * (latitude - ${lat}), 2) +
            POW(69.1 * (${lng} - longitude) * COS(latitude / 57.3), 2)
        ) ASC
        LIMIT 3
    `);
  }
}
