import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BoardDto from './dto/board.dto';
import Board from './entities/board.entity';
import BoardRepository from './boards.repository';

@Injectable()
export default class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async create(boardDto: BoardDto): Promise<Board> {
    const board = this.boardRepository.create(boardDto);
    await this.boardRepository.save(board);
    return board;
  }

  async findAll(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async findOne(id: string): Promise<Board> {
    const board = await this.boardRepository.findOne(id);
    if (!board) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
    return board;
  }

  async update(id: string, boardDto: BoardDto): Promise<Board> {
    const updatedBoard = await this.findOne(id);
    Object.assign(updatedBoard, boardDto);
    await this.boardRepository.save(updatedBoard);
    return updatedBoard;
  }

  async remove(id: string): Promise<void> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with id ${id} not found`);
    }
  }
}
