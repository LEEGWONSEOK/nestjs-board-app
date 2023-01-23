import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCreateDto } from './dtos/auth-create.dto';
import { AuthCredentialsDto } from './dtos/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(authCreateDto: AuthCreateDto): Promise<void> {
    return this.userRepository.signUp(authCreateDto);
  }

  signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const jwtService = this.jwtService;
    return this.userRepository.signIn(jwtService, authCredentialsDto);
  }
}
