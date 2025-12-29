import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Seat } from '../../movies/entities/seat.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'CONFIRMED' })
  status: string;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @OneToMany(() => Seat, (seat) => seat.booking)
  seats: Seat[];
}
