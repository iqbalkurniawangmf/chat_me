import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User, UserStatus, UserRole } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: 'agung_bayu' })
  username: string;

  @ApiProperty({ example: 'agung@example.com' })
  email: string | null;

  @ApiPropertyOptional({ example: '+6281234567890' })
  phone: string | null;

  // 👇 INI YANG PALING PENTING:
  // @Exclude() akan membuang field ini dari response JSON ke client
  @Exclude()
  passwordHash: string | null;

  @Exclude()
  twoFaSecret: string | null;

  @ApiProperty({ example: 'Agung Bayu Sapudin' })
  displayName: string;

  @ApiPropertyOptional({ example: 'Backend Developer' })
  bio: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/avatar.jpg' })
  avatarUrl: string | null;

  @ApiPropertyOptional({ example: 'https://example.com/cover.jpg' })
  coverUrl: string | null;

  @ApiProperty({ enum: UserStatus, example: UserStatus.ONLINE })
  status: UserStatus;

  @ApiProperty({ enum: UserRole, example: UserRole.USER })
  role: UserRole;

  @ApiProperty({ example: true })
  isVerified: boolean;

  @ApiProperty({ example: true })
  isActive: boolean;

  @Exclude()
  isDeleted: boolean;

  @Exclude()
  twoFaEnabled: boolean;

  @ApiPropertyOptional({ example: '2024-05-16T10:00:00Z' })
  lastSeenAt: Date | null;

  @ApiPropertyOptional({ example: '2024-05-16T09:00:00Z' })
  lastActiveAt: Date | null;

  @ApiProperty({ example: 'UTC' })
  timezone: string | null;

  @ApiProperty({ example: 'id' })
  locale: string | null;

  @Exclude()
  metadata: any | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @Exclude()
  deletedAt: Date | null;

  // Constructor ini akan dipanggil di Controller untuk melakukan transformasi data dari Prisma
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
