import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // รับ Token จาก Header
      ignoreExpiration: false, // ถ้า Token หมดอายุให้ตีกลับ
      secretOrKey: configService.get<string>('JWT_SECRET') || 'mySecretKey123', // ต้องตรงกับตอน Login
    });
  }

  // เมื่อแกะ Token เสร็จ จะได้ข้อมูล userId, email, role มาใช้ต่อ
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}