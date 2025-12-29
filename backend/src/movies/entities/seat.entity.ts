import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Showtime } from './showtime.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNo: string; // เช่น A1, B2

  @Column({ default: false })
  isBooked: boolean;

  @ManyToOne(() => Showtime, (showtime) => showtime.seats)
  showtime: Showtime;

  @ManyToOne(() => Booking, (booking) => booking.seats, { nullable: true })
  booking: Booking; // ถ้าว่าง column นี้จะเป็น null
}