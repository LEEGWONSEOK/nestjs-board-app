import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/decorator/typeorm-ex.module';

import { AuthController, UsersController } from './user.controller';
import { UsersService } from './user.service';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])],
  controllers: [UsersController, AuthController],
  providers: [UsersService],
})
export class UsersModule {}
