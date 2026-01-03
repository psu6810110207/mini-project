import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seat } from './seat.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; // ชื่อหนัง

  @Column()
  description: string; // รายละเอียด

  @Column({ type: 'timestamp', nullable: true })
  showtime: Date; // ต้องมีตัวนี้ให้ตรงกับใน DB

  @OneToMany(() => Seat, (seat) => seat.movie)
  seats: Seat[]; // หนัง 1 เรื่อง มีที่นั่งเยอะๆ
}