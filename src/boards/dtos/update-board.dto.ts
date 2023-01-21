import { IsNotEmpty } from 'class-validator';
import { BoardStatus } from '../board-status.enum';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto extends CreateBoardDto {
  @IsNotEmpty()
  status: BoardStatus;
}
