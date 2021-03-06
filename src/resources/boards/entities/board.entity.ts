import { randomUUID } from 'crypto';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IBoard, IColumn } from '../../../interfaces/types';

/**
 * class Board
 */

@Entity({ name: 'board' })
export default class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 150 })
  title: string;

  @Column({ type: 'json', nullable: true })
  columns: IColumn[];

  /**
   * Board constructor.
   * @param id - identifier of the board
   * @param title - the board title
   * @param columns - columns of the board
   */
  constructor(
    { id = randomUUID(), title = 'Board', columns = [] } = {} as IBoard,
  ) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Add column to columns array
   * @param title - title of the column
   */
  addColumn(title: string): void {
    const id = randomUUID();
    const order = Math.max(...this.columns.map((item) => item.order)) + 1;
    this.columns.push({ id, title, order } as IColumn);
  }
}
