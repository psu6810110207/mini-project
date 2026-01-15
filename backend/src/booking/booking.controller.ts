import { Controller, Get, Post, Body } from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // รับข้อมูลเป็น { seatIds: [1, 2, 3] }
  @Post()
  create(@Body() body: { seatIds: number[] }) {
    return this.bookingService.createBookings(body.seatIds);
  }

  @Get()
  findAll() {
    return this.bookingService.findAll();
  }
}