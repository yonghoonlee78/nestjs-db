import {
  Controller,
  Get,
  Body,
  UseGuards,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from '../../auth/jwt/jwt-auth.guard';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/search')
  async findByEmail(@Query('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/count')
  async getCount() {
    return this.userService.count();
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.userService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:userId/exists')
  async exists(@Param('userId') userId: string) {
    return this.userService.exists(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() createUserDto: CreateUserDto
  ) {
    return this.userService.update(userId, createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
