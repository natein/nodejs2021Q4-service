import { ITask } from '../../common/types';
import * as DB from '../../common/db';
import Task from'./task.model';

/**
 * Get all tasks of the board with specified identifier
 * @param boardId - Identifier of the board
 * @returns Promise Array of Task objects
 */
const getAll = async (boardId: string): Promise<ITask[]> => {
  const tasks = await DB.getTasksByBoard(boardId);
  if (tasks.length === 0) {
    throw new Error(`The board with boardId ${boardId} was not found`);
  }
  return tasks;
}

/**
 * Get Task with specified identifier
 * @param id - Identifier of the task
 * @returns Promise Task object
 */
const get = async (id: string): Promise<ITask> => {
  const task = await DB.getTaskById(id);
  if (!task) {
    throw new Error(`Task not found: id=${id}`);
  }
  return task;
};

/**
 * Insert Task to database
 * @param task - instance of Task class
 * @returns Promise Task object
 */
const insert = async (task: ITask): Promise<ITask> => {  
  const newTask = new Task(task);
  const insertedTask = await DB.insertTask(newTask);
  if (!insertedTask) {
    throw new Error(`Can't create task`);
  }    
  return insertedTask;  
}

/**
 * Update Task by identifier with new data
 * @param id - Task identifier
 * @param task - Instance of Task class
 * @returns Updated promise Task object
 */
const update = async (id: string, task: ITask): Promise<ITask> => {
  const item = await DB.updateTask(id, task);
  if (!item) {
    throw new Error(`Can't update ${id} task`);
  }
  return item;
};

/**
 * Delete Task by a identifier.
 * @param id - Task identifier.
 */
const remove = async (id: string): Promise<void> => {
  if (!(await DB.deleteTask(id))) {
    throw new Error(`Can't delete ${id} task`);
  }
};

export {
  getAll,
  get,
  remove,
  insert,
  update
};
