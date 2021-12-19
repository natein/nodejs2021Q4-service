import { v4 as uuid } from 'uuid';
import { IBoard, IColumn } from '../../common/types';

/**
 * class Board
 */
class Board {
  id: string;

  title: string;

  columns: IColumn[];  
  
  /**
   * Board constructor.
   * @param id - identifier of the board
   * @param title - the board title
   * @param columns - columns of the board
   */  
  constructor({
    id = uuid(),
    title = 'Board',
    columns = []
  } = {} as IBoard ) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  /**
   * Add column to columns array
   * @param title - title of the column
   */
  addColumn(title: string):void {
    const id = uuid();
    const order = Math.max(...this.columns.map(item => item.order)) + 1;
    this.columns.push({ id, title, order } as IColumn);
  }
}

export default Board;
