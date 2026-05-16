import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SessionModule } from './session/session.module';
import { PrismaService } from './prisma/prisma.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [UsersModule, SessionModule, ChatModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
