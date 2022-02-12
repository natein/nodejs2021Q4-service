import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TaskDto from './dto/task.dto';
import Task from './entities/task.entity';
import TaskRepository from './tasks.repository';

@Injectable()
export default class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async create(taskDto: TaskDto, boardId: string): Promise<Task> {
    const createdTask = this.taskRepository.create({ ...taskDto, boardId });
    return await this.taskRepository.save(createdTask);
  }

  async findAll(boardId: string): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { boardId },
      loadRelationIds: true,
    });
  }

  async findOne(id: string, boardId: string): Promise<Task> {
    const findedTask = await this.taskRepository.findOne(id, {
      where: { boardId },
      loadRelationIds: true,
    });
    if (!findedTask) {
      throw new NotFoundException(`Task with id = ${id} not found`);
    }
    return findedTask;
  }

  async update(id: string, taskDto: TaskDto, boardId: string): Promise<Task> {
    const updatedTask = await this.findOne(id, boardId);
    if (!updatedTask) {
      throw new NotFoundException(`Task with id = ${id} not found`);
    }
    return await this.taskRepository.save({ ...updatedTask, ...taskDto });
  }

  async remove(id: string): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id = ${id} not found`);
    }
  }
}
