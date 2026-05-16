import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // 👈 Ini kunci utamanya!
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // 👈 Wajib di-export agar bisa dipakai di service lain
})
export class PrismaModule {}
