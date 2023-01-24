import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { User } from 'src/users/user.entity';
import { CustomRepository } from 'src/decorator/typeorm-ex.decorator';
import { CreateBoardDto } from './dtos/create-board.dto';
import { BoardStatus } from './interfaces/board-status.enum';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { NotFoundException } from '@nestjs/common';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const { title, description } = createBoardDto;
    const result = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user,
    });
    await this.save(result);
    return result;
  }

  async getAllBoards(): Promise<Board[]> {
    return this.find();
  }

  async getBoardsFromUser(user: User): Promise<Board[]> {
    const query = this.createQueryBuilder('board');

    query.where('board.userId = :userId', { userId: user.id });
    const boards = await query.getMany();
    return boards;
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

  async deleteBoardById(id: number, user: User): Promise<string> {
    const userId: number = user.id;
    const result = await this.delete({ id });
    if (result.affected !== 1) {
      throw new NotFoundException(`Can't find Board with id '${id}'`);
    }
    return `Board '${id}' has been deleted`;
  }
}
