import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthCreateDto } from './dtos/auth-create.dto';
import { AuthCredentialsDto } from './dtos/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/get-user.decorator';
import { User } from './user.entity';

@Controller('/auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() authCreateDto: AuthCreateDto): Promise<void> {
    return this.usersService.signUp(authCreateDto);
  }

  @Post('/sign-in')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.usersService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('user', user);
  }
}

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}
}
