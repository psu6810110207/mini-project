import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Booking } from '../../booking/entities/booking.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // user_id

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'USER' })
  role: string; // 'ADMIN' หรือ 'USER'

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];
}
