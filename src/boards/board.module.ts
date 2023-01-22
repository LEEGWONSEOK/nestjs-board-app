import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/decorator/typeorm-ex.module';
import { BoardRepository } from './board.repository';
import { BoardsController } from './board.controller';
import { BoardsService } from './board.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([BoardRepository])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
