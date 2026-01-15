import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // อย่าลืม import นี้
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { Showtime } from './entities/showtime.entity';
import { Seat } from './entities/seat.entity';
import { SeatsService } from './seats.service'; // เพิ่มอันนี้
import { SeatsController } from './seats.controller'; // เพิ่มอันนี้

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Seat, Showtime])],
  controllers: [MoviesController, SeatsController], // ใส่ SeatsController เพิ่ม
  providers: [MoviesService, SeatsService], // ใส่ SeatsService เพิ่ม
})
export class MoviesModule {}