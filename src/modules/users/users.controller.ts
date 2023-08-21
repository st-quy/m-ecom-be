// users.controller.ts
import { Controller, Get, Param, Body, Delete, Post, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './entities';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(): Promise<Users[]> {
    return await this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<Users> {
    return await this.usersService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<Users> {
    return await this.usersService.updateUser(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return await this.usersService.deleteUser(id);
  }
}