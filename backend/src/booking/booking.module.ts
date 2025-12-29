import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Booking])
  ],
  controllers: [BookingController],
  providers: [BookingsService],
})
export class BookingModule {}
