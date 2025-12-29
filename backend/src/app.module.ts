import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'; // หรือ users.module เช็ค path ดีๆ
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    // 1. โหลด Config Module เพื่อใช้อ่านค่าต่างๆ
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. ตั้งค่าเชื่อมต่อ Database (ต้องตรงกับใน docker-compose.yml)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',      // ตรงกับ POSTGRES_USER
      password: 'password123',// ตรงกับ POSTGRES_PASSWORD
      database: 'moviedb',    // ตรงกับ POSTGRES_DB
      autoLoadEntities: true, // โหลด Entity อัตโนมัติ
      synchronize: true,      // **สำคัญ** แก้ Database ตามโค้ดเราอัตโนมัติ (ใช้เฉพาะตอน Dev)
    }),
    UserModule,
    AuthModule,
    BookingModule,
    MoviesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}