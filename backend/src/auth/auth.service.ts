import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UserService } from '../user/user.service'; // เช็ค path
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // 1. ระบบสมัครสมาชิก (Register)
  async register(registerDto: any) {
    // เช็คก่อนว่ามีอีเมลนี้หรือยัง (ต้องไปเพิ่ม function findOneByEmail ใน UserService ก่อน เดี๋ยวพาทำ)
    // แต่ตอนนี้เขียน Logic หลักไว้ก่อน
    
    // Hash Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    // เรียกใช้ userService เพื่อสร้าง User ใหม่
    // (ตรงนี้เราต้องประยุกต์ใช้ create ของ user.service)
    return this.userService.create({
      ...registerDto,
      password: hashedPassword, // บันทึกแบบ Hash
    });
  }

  // 2. ระบบล็อกอิน (Login)
  async login(loginDto: any) {
    // หา User จากอีเมล (เดี๋ยวต้องไปเพิ่มฟังก์ชันนี้ใน UserService)
    const user = await this.userService.findOneByEmail(loginDto.email); 
    
    // ถ้าไม่เจอ User หรือ Password ไม่ตรงกัน
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
    }

    // ถ้าผ่าน ให้สร้าง Token
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, email: user.email, role: user.role } // ส่งข้อมูล user กลับไปนิดหน่อย
    };
  }
}