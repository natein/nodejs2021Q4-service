import { v4 as uuid } from 'uuid';
import { ITask, IUser } from '../../common/types';

/**
 * class Task
 */
class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;
  
  /**
   * Task constructor
   * @param id - instance identifier
   * @param title - task title
   * @param order - task order
   * @param description - task description
   * @param userId - task owner identifier
   * @param boardId - board identifier
   * @param columnId - column identifier
   */  
  constructor({
    id = uuid(),
    title = 'Task',
    order = 0,
    description = '',
    userId = null,
    boardId = '',
    columnId = ''
  } = {} as ITask) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Assign user to task 
   * @param user - User instance.
   */  
  assignUser(user: IUser):void {
    this.userId = user.id;
  }
}

export default Task;
