import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne } from 'typeorm';
import { Seat } from '../../movies/entities/seat.entity'; // เช็ค Path ให้ถูกนะครับ
import { User } from '../../user/entities/user.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date; // บันทึกเวลาจองอัตโนมัติ

  // ความสัมพันธ์: 1 ใบจอง มีได้หลายที่นั่ง
  @OneToMany(() => Seat, (seat) => seat.booking)
  seats: Seat[];

  @ManyToOne(() => User, (user) => user.bookings) 
  user: User;
}