import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seat } from './seat.entity';
import { Showtime } from './showtime.entity';
@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({nullable: true})
  img: string;

  @Column({ nullable: true })
  description: string;

  // 👇 แก้บรรทัดนี้ครับ! เพิ่ม onDelete: 'CASCADE'
  @OneToMany(() => Seat, (seat) => seat.movie, { cascade: true, onDelete: 'CASCADE' })
  seats: Seat[];

  // 👇 2. เพิ่มก้อนนี้เข้าไปครับ (เพื่อให้ Movie รู้จัก Showtime)
  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes: Showtime[]; 
}
