import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CustomRepository } from 'src/decorator/typeorm-ex.decorator';
import { AuthCreateDto } from './dtos/auth-create.dto';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCreateDto: AuthCreateDto): Promise<void> {
    const { email, password, nickname } = authCreateDto;
    const result = this.create({
      email,
      password,
      nickname,
    });
    await this.save(result);
  }
}
