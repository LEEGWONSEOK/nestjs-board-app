import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/decorator/typeorm-ex.decorator';
import { AuthCreateDto } from './dtos/auth-create.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCreateDto: AuthCreateDto): Promise<void> {
    const { email, password, nickname } = authCreateDto;
    const result = this.create({
      email,
      password,
      nickname,
    });

    try {
      await this.save(result);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `The account created with that email already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
