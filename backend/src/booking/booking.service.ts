import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { Seat } from '../movies/entities/seat.entity'; // เช็ค Path

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  // ฟังก์ชันจองที่นั่ง
  async createBookings(seatIds: number[]) {
    // 1. ค้นหาที่นั่งตาม ID ที่ส่งมา
    const seats = await this.seatRepository.findBy({
      id: In(seatIds),
    });

    // 2. เช็คว่าเจอที่นั่งครบไหม?
    if (seats.length !== seatIds.length) {
      throw new BadRequestException('ไม่พบข้อมูลที่นั่งบางรายการ');
    }

    // 3. เช็คว่ามีที่นั่งไหนโดนจองไปแล้วหรือยัง? (กันคนแย่งกันกด)
    const alreadyBooked = seats.some((seat) => seat.isBooked);
    if (alreadyBooked) {
      throw new BadRequestException('เสียใจด้วย! มีบางที่นั่งถูกจองตัดหน้าไปแล้ว');
    }

    // 4. สร้างใบจองใหม่ (Booking)
    const newBooking = this.bookingRepository.create();
    const savedBooking = await this.bookingRepository.save(newBooking);

    // 5. อัปเดตสถานะที่นั่ง (isBooked = true และผูกกับใบจองนี้)
    for (const seat of seats) {
      seat.isBooked = true;
      seat.booking = savedBooking;
      await this.seatRepository.save(seat);
    }

    return { message: 'จองสำเร็จ!', bookingId: savedBooking.id, seats };
  }

  findAll() {
    return this.bookingRepository.find({ relations: ['seats'] });
  }
}