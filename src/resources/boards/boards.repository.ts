import { EntityRepository, Repository } from 'typeorm';
import Board from './entities/board.entity';

@EntityRepository(Board)
export default class BoardRepository extends Repository<Board> {}
