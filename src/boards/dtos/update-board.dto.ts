import { IsNotEmpty } from 'class-validator';
import { BoardStatus } from '../interfaces/board-status.enum';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends CreateBoardDto {
  @IsNotEmpty()
  status: BoardStatus;
}
