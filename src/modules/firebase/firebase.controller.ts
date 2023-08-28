import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as admin from 'firebase-admin';

@Controller()
export class FirebaseController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

   @Get('login/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: Request) {
    const user = req.user as any;
    const accessToken = await this.generateAccessToken(user);
    return { accessToken };
  }

  private async generateAccessToken(user: any): Promise<string> {
    const payload = {
      name: user.name,
      role: 'user', // Default role for Google login
      refreshToken: user.refreshToken,
    };

    const generatedAccessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('EXP_IN_ACCESS_TOKEN'),
    });
    return generatedAccessToken;
  }
}
