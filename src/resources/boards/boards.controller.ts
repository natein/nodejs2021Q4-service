import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import JwtAuthGuard from '../login/guards/jwt-auth.guard';
import BoardsService from './boards.service';
import BoardDto from './dto/board.dto';

@Controller('boards')
@UseGuards(JwtAuthGuard)
export default class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Post()
  create(@Body() boardDto: BoardDto) {
    return this.boardsService.create(boardDto);
  }

  @Get()
  findAll() {
    return this.boardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() boardDto: BoardDto) {
    return this.boardsService.update(id, boardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardsService.remove(id);
  }
}
