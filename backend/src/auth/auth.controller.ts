import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common'; // Import เพิ่ม
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport'; // Import เพิ่ม

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  // *** เพิ่มส่วนนี้ ***
  @UseGuards(AuthGuard('jwt')) // บังคับว่าต้องมี Token
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // ส่งข้อมูลคนล็อกอินกลับไป
  }
}