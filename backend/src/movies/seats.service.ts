import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity'; // เช็ค path ให้ถูกตามเครื่องคุณ

@Injectable()
export class SeatsService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  // ดึงที่นั่งทั้งหมดของหนังเรื่องนั้นๆ มาโชว์ที่หน้าเว็บ
  async findByMovie(movieId: number): Promise<Seat[]> {
    return await this.seatRepository.find({
      where: { movie: { id: movieId } },
      order: { seatNumber: 'ASC' }, // เรียงตามเลขที่นั่ง 101, 102...
    });
  }
}