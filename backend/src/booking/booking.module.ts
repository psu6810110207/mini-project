import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { AuthModule } from '../auth/auth.module';
import { Movie } from 'src/movies/entities/movie.entity';
import { Seat } from 'src/movies/entities/seat.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Booking, Movie, Seat, User])
  ],
  controllers: [BookingController],
  providers: [BookingsService],
})
export class BookingModule {}
