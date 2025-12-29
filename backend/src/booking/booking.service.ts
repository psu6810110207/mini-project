import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm'; // ใช้สำหรับ Transaction
import { Booking } from './entities/booking.entity';
import { Seat } from '../movies/entities/seat.entity';
import { User } from '../user/entities/user.entity';
@Injectable()
export class BookingsService {
  constructor(private dataSource: DataSource) {} // Inject DataSource เข้ามา

  async createBooking(userId: number, seatIds: number[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction(); // 1. เริ่ม Transaction (เริ่มจับตาดู)

    try {
      // 2. ค้นหา User (เพื่อให้แน่ใจว่ามีตัวตน)
      const user = await queryRunner.manager.findOne(User, { where: { id: userId } });
      if (!user) throw new NotFoundException('User not found');

      // 3. ดึงข้อมูลที่นั่งตาม ID ที่ส่งมา และต้อง "ยังไม่ถูกจอง (isBooked: false)"
      const seatsToBook = await queryRunner.manager
        .createQueryBuilder(Seat, 'seat')
        .where('seat.id IN (:...ids)', { ids: seatIds })
        .andWhere('seat.isBooked = :isBooked', { isBooked: false }) // สำคัญมาก!
        .getMany();

      // 4. เช็คจำนวน: ถ้าเจอที่นั่งว่าง ไม่ครบตามจำนวนที่ขอมา (แปลว่ามีบางที่โดนจองตัดหน้า)
      if (seatsToBook.length !== seatIds.length) {
        throw new ConflictException('บางที่นั่งถูกจองไปแล้ว หรือไม่ถูกต้อง');
      }

      // 5. สร้าง Booking Record
      const newBooking = new Booking();
      newBooking.user = user;
      newBooking.status = 'CONFIRMED';
      const savedBooking = await queryRunner.manager.save(newBooking);

      // 6. อัปเดตที่นั่ง: ว่าถูกจองแล้ว และผูกกับ Booking นี้
      for (const seat of seatsToBook) {
        seat.isBooked = true;
        seat.booking = savedBooking; // ผูก FK
        await queryRunner.manager.save(seat);
      }

      // 7. ถ้าทุกอย่างผ่านฉลุย -> ยืนยันการบันทึก (Commit)
      await queryRunner.commitTransaction();

      return { message: 'Booking successful', bookingId: savedBooking.id };

    } catch (err) {
      // 8. ถ้ามีขั้นตอนไหนพัง -> ยกเลิกทั้งหมด (Rollback) เหมือนไม่เคยเกิดขึ้น
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // 9. ปล่อย Connection คืน
      await queryRunner.release();
    }
  }

  findAll() {
    return this.dataSource.getRepository(Booking).find({ relations: ['user', 'seats'] });
  }
}