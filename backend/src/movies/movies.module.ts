import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // อย่าลืม import นี้
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Movie } from './entities/movie.entity';
import { Showtime } from './entities/showtime.entity';
import { Seat } from './entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Showtime, Seat])], // ใส่ให้ครบ 3 ตัว
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [TypeOrmModule] // export เผื่อ Module อื่นต้องใช้
})
export class MoviesModule {}
