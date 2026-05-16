import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    // Membuka koneksi ke database saat aplikasi start
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$connect();
  }

  async onModuleDestroy() {
    // Menutup koneksi database saat aplikasi dimatikan (graceful shutdown)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$disconnect();
  }

  // Opsi tambahan: Membersihkan database (berguna untuk testing)
  async cleanDatabase() {
    if (process.env.NODE_ENV === 'test') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const models = Reflect.getMetadata('prisma:models', this) || [];
      for (const model of models) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        await this[model].deleteMany();
      }
    }
  }
}
