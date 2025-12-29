import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from './showtime.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  duration: number; // ความยาวหนัง (นาที)

  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes: Showtime[];
}
