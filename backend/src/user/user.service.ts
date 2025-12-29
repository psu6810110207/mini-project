import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // สร้าง User ใหม่
  create(createUserDto: any) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  // ** เพิ่มฟังก์ชันนี้สำหรับ Auth **
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // ฟังก์ชันพื้นฐานอื่นๆ (findAll, findOne...) ปล่อยไว้เหมือนเดิม
  findAll() { return this.usersRepository.find(); }
  findOne(id: number) { return this.usersRepository.findOne({ where: { id } }); }

  async update(id: number, updateUserDto: any) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}