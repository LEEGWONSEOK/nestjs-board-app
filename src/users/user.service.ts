import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCreateDto } from './dtos/auth-create.dto';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  signUp(authCreateDto: AuthCreateDto): Promise<void> {
    return this.userRepository.signUp(authCreateDto);
  }
}
