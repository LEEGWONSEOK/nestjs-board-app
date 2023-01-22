import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { Board } from './board.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  updateBoardById(id: number, updateBoardDto: UpdateBoardDto): Promise<string> {
    return this.boardRepository.updateBoardById(id, updateBoardDto);
  }

  deleteBoardById(id: number): Promise<string> {
    return this.boardRepository.deleteBoardById(id);
  }
}
