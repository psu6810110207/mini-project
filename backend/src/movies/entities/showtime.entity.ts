import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';
import { Seat } from './seat.entity';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  startTime: Date;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  movie: Movie;

  @OneToMany(() => Seat, (seat) => seat.showtime)
  seats: Seat[];
}