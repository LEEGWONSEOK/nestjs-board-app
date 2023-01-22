import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthCreateDto } from './dtos/auth-create.dto';

@Controller('/auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCreateDto: AuthCreateDto): Promise<void> {
    return this.usersService.signUp(authCreateDto);
  }
}

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
}
