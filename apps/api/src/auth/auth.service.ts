import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto, OtpRequestDto, OtpVerifyDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        phone: dto.phone,
        passwordHash,
        role: 'BUYER',
      },
      select: { id: true, email: true, name: true, phone: true, role: true },
    });

    return { user, token: this.generateToken(user) };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || !user.passwordHash) throw new UnauthorizedException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const { passwordHash, otpCode, ...safeUser } = user;
    return { user: safeUser, token: this.generateToken(safeUser) };
  }

  async requestOtp(dto: OtpRequestDto) {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let user = await this.prisma.user.findFirst({
      where: { OR: [{ phone: dto.phone }, { email: dto.email }] },
    });

    if (user) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { otpCode: otp, otpExpiresAt: expiresAt },
      });
    } else if (dto.email && dto.name) {
      user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          phone: dto.phone,
          otpCode: otp,
          otpExpiresAt: expiresAt,
          role: 'BUYER',
        },
      });
    } else {
      throw new BadRequestException('Email and name required for new users');
    }

    // In production, send OTP via SMS
    return { message: 'OTP sent successfully', otp: process.env.NODE_ENV === 'development' ? otp : undefined };
  }

  async verifyOtp(dto: OtpVerifyDto) {
    const user = await this.prisma.user.findFirst({
      where: { phone: dto.phone },
    });

    if (!user || user.otpCode !== dto.otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      throw new UnauthorizedException('OTP expired');
    }

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: { otpCode: null, otpExpiresAt: null, phoneVerified: true },
    });

    const { passwordHash, otpCode, ...safeUser } = updated;
    return { user: safeUser, token: this.generateToken(safeUser) };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        role: true,
        createdAt: true,
        savedApartments: {
          include: {
            apartment: {
              include: { images: { where: { isPrimary: true }, take: 1 }, location: true },
            },
          },
        },
      },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

  private generateToken(user: { id: string; email: string; role: string }) {
    return this.jwtService.sign({ sub: user.id, email: user.email, role: user.role });
  }
}
