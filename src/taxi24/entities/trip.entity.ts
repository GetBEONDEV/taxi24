import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Driver } from './driver.entity';
import { Passenger } from './passenger.entity';
import { Invoice } from './invoice.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, (driver) => driver.trips)
  driver: Driver;

  @ManyToOne(() => Passenger, (passenger) => passenger.trips)
  passenger: Passenger;

  @Column({ type: 'varchar', length: 255, default: 'active' })
  status: string;

  @OneToOne(() => Invoice, { cascade: true })
  @JoinColumn()
  invoice: Invoice;
}
