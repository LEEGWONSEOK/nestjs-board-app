import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('/boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  // @Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  // @Patch('/:id')
  // @UsePipes(ValidationPipe)
  // updateBoardById(
  //   @Param('id') id: string,
  //   @Body(BoardStatusValidationPipe) updateBoardDto: UpdateBoardDto, //BoardStatusValidationPipe;
  // ): Board {
  //   return this.boardsService.updateBoardById(id, updateBoardDto);
  // }

  @Delete('/:id')
  deleteBoardById(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardsService.deleteBoardById(id);
  }
}
