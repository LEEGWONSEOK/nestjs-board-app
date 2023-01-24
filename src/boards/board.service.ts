import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { Board } from './board.entity';
import { User } from 'src/users/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoards();
  }

  getBoardsFromUser(user: User): Promise<Board[]> {
    return this.boardRepository.getBoardsFromUser(user);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  updateBoardById(id: number, updateBoardDto: UpdateBoardDto): Promise<string> {
    return this.boardRepository.updateBoardById(id, updateBoardDto);
  }

  deleteBoardById(id: number, user: User): Promise<string> {
    return this.boardRepository.deleteBoardById(id, user);
  }
}
