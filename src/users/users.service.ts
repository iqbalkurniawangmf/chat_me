import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash } from 'bcrypt';
import type { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;

    const conditions = [
      userData.username && { username: userData.username },
      userData.email && { email: userData.email },
      userData.phone && { phone: userData.phone },
    ].filter(
      (
        condition,
      ): condition is
        | { username: string }
        | { email: string }
        | { phone: string } => Boolean(condition),
    );

    const existingUser = await this.prisma.user.findFirst({
      where: conditions.length > 0 ? { OR: conditions } : undefined,
    });

    if (existingUser) {
      throw new Error('Username, email, atau nomor telepon sudah digunakan');
    }

    try {
      const saltRounds = 10;
      const passwordHash = await hash(password, saltRounds);

      const newUser = await this.prisma.user.create({
        data: {
          ...userData,
          passwordHash,
        },
      });

      return newUser;
    } catch (error: unknown) {
      console.error(error);
      throw new InternalServerErrorException('Gagal membuat pengguna baru');
    }
  }
  async findAll(): Promise<User> {
    const user = await this.prisma.user.findMany();

    // pagenation format

    return user;
  }

  async findOne(id: number): Promise<string> {
    return Promise.resolve(`This action returns a #${id} user`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, _updateUserDto: UpdateUserDto): Promise<string> {
    return Promise.resolve(`This action updates a #${id} user`);
  }

  async remove(id: number): Promise<string> {
    return Promise.resolve(`This action removes a #${id} user`);
  }

  async count(): Promise<number> {
    return this.prisma.user.count();
  }
}
