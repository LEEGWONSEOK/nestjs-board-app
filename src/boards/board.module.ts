import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/decorator/typeorm-ex.module';

import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';
import { BoardRepository } from './board.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
