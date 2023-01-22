import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { CustomRepository } from 'src/decorator/typeorm-ex.decorator';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardStatus } from './interfaces/board-status.enum';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description } = createBoardDto;
    const result = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });
    await this.save(result);
    return result;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const result = await this.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`Can't find Board with id '${id}'`);
    }
    return result;
  }

  async updateBoardById(
    id: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<string> {
    const { title, description, status } = updateBoardDto;
    const result = await this.update(id, {
      title,
      description,
      status,
    });
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Board with id '${id}'`);
    }
    return `Board '${id}' has been updated`;
  }

  async deleteBoardById(id: number): Promise<string> {
    const result = await this.delete(id);
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Board with id '${id}'`);
    }
    return `Board '${id}' has been deleted`;
  }
}
