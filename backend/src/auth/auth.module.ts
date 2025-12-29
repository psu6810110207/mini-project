import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // เช็ค path ให้ถูก (user หรือ users)
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule, // ต้อง import เพื่อเรียกใช้ UserService
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'mySecretKey123', // ใช้ค่าจาก .env หรือค่า default
        signOptions: { expiresIn: '1d' }, // Token หมดอายุใน 1 วัน
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
