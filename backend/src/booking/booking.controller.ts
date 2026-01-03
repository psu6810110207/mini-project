import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BookingsService } from './booking.service';

@Controller('bookings') // กำหนดชื่อ path เป็น /bookings
@UseGuards(AuthGuard('jwt')) // 🔒 ล็อกประตู! ต้องมี Token เท่านั้นถึงจะเข้าได้
export class BookingController {
  constructor(private readonly bookingService: BookingsService) {}

  @Post()
  async createBooking(@Request() req, @Body() body) {
    const userId = req.user.id || req.user.userId; 

  // 2. ดึงลิสต์ ID ที่นั่งจาก Body (Service ของคุณรับเป็น Array)
  const { seatIds } = body; 

  // 3. ส่งเฉพาะข้อมูลที่ Service ต้องการ
  return this.bookingService.createBooking(userId, seatIds);
  }
}