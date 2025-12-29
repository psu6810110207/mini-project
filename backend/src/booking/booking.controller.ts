import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { BookingsService } from './booking.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() createBookingDto: CreateBookingDto) {
    // ดึง userId มาจาก Token (req.user)
    const userId = req.user.userId;
    // ใช้ createBookingDto (ตัวเล็ก)
    return this.bookingService.createBooking(userId, createBookingDto.seatIds);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }
}