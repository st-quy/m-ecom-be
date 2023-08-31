import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request , Response } from 'express';
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
async googleLoginCallback(@Req() req: Request, @Res() res: Response) {
  const user = req.user as any;
  const accessToken = await this.generateAccessToken(user);
  
  // Redirect to the frontend homepage with the accessToken as a query parameter
  const redirectUrl = `http://localhost:3000/homepage?accessToken=${accessToken}`;
  res.redirect(redirectUrl); // Use res.redirect instead of res.redirected
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
