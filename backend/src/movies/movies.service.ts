import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { Seat } from './entities/seat.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Seat)
    private seatsRepository: Repository<Seat>,
  ) {}

  // ฟังก์ชันสร้างหนัง และ สร้างที่นั่ง 10 ที่ให้อัตโนมัติ
  async create(createMovieDto: any) {
    // 1. สร้างและบันทึกข้อมูลหนัง
    const movie = this.moviesRepository.create(createMovieDto);
    const savedMovie = await this.moviesRepository.save(movie);

    // 2. วนลูปสร้างที่นั่ง 10 ที่ (เบอร์ 1-10) ผูกกับหนังเรื่องนี้
    for (let i = 1; i <= 10; i++) {
      const seat = this.seatsRepository.create({
        seatNumber: i,
        isBooked: false,
        movie: savedMovie as any, // ผูก ID หนัง
      });
      await this.seatsRepository.save(seat);
    }

    return { message: 'สร้างหนังและที่นั่งเรียบร้อย', movie: savedMovie };
  }

  findAll() {
    // ดึงข้อมูลหนัง พร้อมดูว่ามีที่นั่งอะไรบ้าง (relations)
    return this.moviesRepository.find({ relations: ['seats'] });
  }
}