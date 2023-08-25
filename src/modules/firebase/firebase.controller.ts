import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import * as admin from 'firebase-admin';

@Controller('')
export class FirebaseController {
  constructor() {}

  @Get('login/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {}

  @Get('login/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleLoginCallback(@Req() req: Request) {
    const id = req.user['id'];
    if (!id) {
      throw new UnauthorizedException('User ID not found.');
    }
    const accessToken = await admin.auth().createCustomToken(id);
    return { accessToken };
  }
}
