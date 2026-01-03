import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module'; // หรือ users.module เช็ค path ดีๆ
import { AuthModule } from './auth/auth.module';
import { BookingModule } from './booking/booking.module';
import { MoviesModule } from './movies/movies.module';
import { SeatsController } from './seats/seats.controller';
import { SeatsService } from './seats/seats.service';

@Module({
  imports: [
    // 1. โหลด Config Module เพื่อใช้อ่านค่าต่างๆ
    ConfigModule.forRoot({
      isGlobal: true, // ให้เรียกใช้ได้ทุกที่ในโปรเจกต์
      envFilePath: '.env',
  }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // <--- เปลี่ยนเป็น postgres
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ใช้ true เฉพาะตอน Dev (ห้ามใช้บน Production จริง)
      }),

      }),
    UserModule,
    AuthModule,
    BookingModule,
    MoviesModule,
  ],
  controllers: [AppController, SeatsController],
  providers: [AppService, SeatsService],
})
export class AppModule {}