import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/decorator/typeorm-ex.decorator';
import { AuthCreateDto } from './dtos/auth-create.dto';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthCredentialsDto } from './dtos/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCreateDto: AuthCreateDto): Promise<void> {
    const { email, password, nickname } = authCreateDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = this.create({
      email,
      password: hashedPassword,
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

  async signIn(
    jwtService: JwtService,
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 (secret + payload)
      const payload = { email };
      const accessToken = await jwtService.sign(payload);

      return { accessToken };
    } else {
      throw new UnauthorizedException(`sign in failed`);
    }
  }
}
