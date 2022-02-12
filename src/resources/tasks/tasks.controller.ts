import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import TasksService from './tasks.service';
import TaskDto from './dto/task.dto';
import JwtAuthGuard from '../login/guards/jwt-auth.guard';

@Controller('boards/:boardId/tasks')
@UseGuards(JwtAuthGuard)
export default class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Param('boardId') boardId: string, @Body() taskDto: TaskDto) {
    return this.tasksService.create(taskDto, boardId);
  }

  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.tasksService.findAll(boardId);
  }

  @Get('/:id')
  findOne(@Param('id') id: string, @Param('boardId') boardId: string) {
    return this.tasksService.findOne(id, boardId);
  }

  @Put('/:id')
  update(
    @Body() taskDto: TaskDto,
    @Param('id') id: string,
    @Param('boardId') boardId: string,
  ) {
    return this.tasksService.update(id, taskDto, boardId);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
