import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';
import { Trip } from './trip.entity';

@Entity()
export class Passenger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @OneToMany(() => Trip, (trip) => trip.passenger)
  trips: Trip[];
}
