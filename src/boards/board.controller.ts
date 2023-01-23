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
  UseGuards,
} from '@nestjs/common';
import { BoardsService } from './board.service';
import { CreateBoardDto } from './dtos/create-board.dto';
import { UpdateBoardDto } from './dtos/update-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/boards')
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Post('/')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardsService.createBoard(createBoardDto);
  }

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  updateBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body(BoardStatusValidationPipe) updateBoardDto: UpdateBoardDto,
  ): Promise<string> {
    return this.boardsService.updateBoardById(id, updateBoardDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.boardsService.deleteBoardById(id);
  }
}
