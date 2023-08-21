// auth/auth.controller.ts
import { Controller, Post, Body, UnauthorizedException, ValidationPipe ,UsePipes} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokensDto } from './dto/refreshToken.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiResponse({status:201, description:'Login successfully!'})
  @ApiResponse({status:401, description:'Login fail!'})
  @UsePipes(ValidationPipe)
  login(@Body() loginUserDto:LoginDto):Promise<any> {
      return this.authService.login(loginUserDto);
  }

  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto) {
    return this.authService.logout(logoutDto);
  }

  @Post('refresh')
    refreshToken(@Body() {refreshToken}):Promise<any>{
        return this.authService.refreshToken(refreshToken);
    }
}
