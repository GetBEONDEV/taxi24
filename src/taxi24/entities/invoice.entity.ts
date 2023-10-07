import { Entity, PrimaryGeneratedColumn, OneToOne, Column } from 'typeorm';
import { Trip } from './trip.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @OneToOne(() => Trip, (trip) => trip.invoice)
  trip: Trip;
}
