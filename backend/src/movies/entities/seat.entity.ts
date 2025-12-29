import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Booking } from '../../booking/entities/booking.entity'; // เช็ค Path ดีๆ นะครับ (ถอย 2 ครั้ง)
import { Showtime } from './showtime.entity';
@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNumber: number; // เลขที่นั่ง (1, 2, 3...)

  @Column({ default: false })
  isBooked: boolean; // จองรึยัง?

  @ManyToOne(() => Movie, (movie) => movie.seats, { onDelete: 'CASCADE' })
  movie: Movie; // ที่นั่งนี้ของหนังเรื่องไหน

  @ManyToOne(() => Showtime, (showtime) => showtime.seats, { onDelete: 'CASCADE' })
  showtime: Showtime;

  @ManyToOne(() => Booking, (booking) => booking.seats, { nullable: true })
  booking: Booking; // ที่นั่งนี้อยู่ในการจองบิลไหน (ถ้ายังไม่จอง เป็น null ได้)
}