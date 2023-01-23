import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/decorator/typeorm-ex.module';

import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { BoardRepository } from './board.repository';
import { UsersModule } from 'src/users/user.module';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    UsersModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
