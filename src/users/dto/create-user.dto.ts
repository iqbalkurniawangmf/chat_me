import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'agung_bayu',
    description: 'Username unik untuk pengguna (Maksimal 50 karakter)',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @ApiPropertyOptional({
    example: 'agung@example.com',
    description: 'Alamat email pengguna',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({
    example: '+6281234567890',
    description: 'Nomor telepon pengguna',
  })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({
    example: 'StrongPass123!',
    description:
      'Password pengguna (Akan di-hash di service, minimal 8 karakter)',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    example: 'Agung Bayu Sapudin',
    description:
      'Nama tampilan atau nama lengkap pengguna (Maksimal 100 karakter)',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  displayName: string;

  @ApiPropertyOptional({
    example: 'Backend Developer & Junior Data Engineer',
    description: 'Biodata singkat pengguna',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiPropertyOptional({
    example: 'https://example.com/avatar.jpg',
    description: 'URL foto profil pengguna',
  })
  @IsUrl()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    example: 'Asia/Jakarta',
    description: 'Zona waktu pengguna',
    default: 'UTC',
  })
  @IsString()
  @IsOptional()
  timezone?: string;

  @ApiPropertyOptional({
    example: 'id',
    description: 'Preferensi bahasa / locale pengguna',
    default: 'en',
  })
  @IsString()
  @IsOptional()
  locale?: string;
}
