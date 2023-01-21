import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';
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

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id '${id}'`);
    }
    return found;
  }

  async updateBoardById(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Board> {
    const board = await this.getBoardById(id);
    return board;
  }
  // updateBoardById(id: string, updateBoardDto: UpdateBoardDto): Board {
  //   const board: Board = this.getBoardById(id);
  //   console.log(board);
  //   const { title, description, status } = updateBoardDto;
  //   console.log(title, description, status);
  //   board.title = title;
  //   board.description = description;
  //   board.status = status;
  //   console.log(board);
  //   return board;
  // }

  async deleteBoardById(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id '${id}'`);
    }
  }
}
