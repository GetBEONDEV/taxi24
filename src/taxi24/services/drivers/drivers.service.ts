import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { Driver } from '../../entities/driver.entity';

import { DriverDto } from 'src/taxi24/dtos/driver.dto';

@Injectable()
export class DriversService {
  constructor(
    @InjectRepository(Driver)
    private driversRepository: Repository<Driver>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  getAllDrivers(): Promise<Driver[]> {
    return this.driversRepository.find();
  }

  async getAvailableDrivers(): Promise<Driver[]> {
    return this.driversRepository.find({ where: { status: 'available' } });
  }

  async create(createDriverDto: DriverDto): Promise<Driver> {
    const driver = new Driver();
    driver.name = createDriverDto.name;
    driver.latitude = createDriverDto.latitude;
    driver.longitude = createDriverDto.longitude;

    return await this.driversRepository.save(driver);
  }

  async getDriverById(id: number): Promise<Driver> {
    const driver = await this.driversRepository.findOne({
      where: { id },
    });

    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    return driver;
  }

  async findDriversWithinRadius(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<Driver[]> {
    const drivers = await this.entityManager.query(
      `
      SELECT * FROM "driver" 
      WHERE ST_DWithin(
        ST_MakePoint(longitude, latitude)::geography, 
        ST_MakePoint($1, $2)::geography, 
        $3
      )
    `,
      [lng, lat, radius],
    );

    return drivers;
  }

  async seedDataDriver() {
    const driver1 = this.driversRepository.create({
      name: 'Juan',
      latitude: 40.7128,
      longitude: -74.006,
      status: 'available',
    });
    const driver2 = this.driversRepository.create({
      name: 'Maria',
      latitude: 40.7128,
      longitude: -74.0061,
      status: 'available',
    });
    const driver3 = this.driversRepository.create({
      name: 'Pedro',
      latitude: 40.7128,
      longitude: -74.0062,
      status: 'available',
    });

    await this.driversRepository.save([driver1, driver2, driver3]);
  }
}
