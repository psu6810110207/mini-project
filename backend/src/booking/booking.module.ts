import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // อย่าลืม import นี้
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from './entities/booking.entity';
import { Seat } from '../movies/entities/seat.entity'; // Import Seat ด้วย
@Module({
  imports: [TypeOrmModule.forFeature([Booking, Seat])], // ลงทะเบียนตรงนี้
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
