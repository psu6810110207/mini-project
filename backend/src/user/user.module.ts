import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 1. เพิ่ม import นี้
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity'; // 2. เพิ่ม import Entity (เช็ค path ให้ถูกนะครับ)

@Module({
  imports: [TypeOrmModule.forFeature([User])], // 3. เพิ่มบรรทัดนี้ เพื่อบอกว่า Module นี้ใช้ตาราง User
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
