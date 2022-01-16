import { ITask } from '../../common/types';
import Task from'../../entities/task.model';
import * as tasksRepo from './task.repository';

/**
 * Get all tasks of the board
 * @param boardId - Identifier of the board
 * @returns Promise Array of task objects
 */
const getAll = (boardId: string):Promise<Task[]> => tasksRepo.getAll(boardId);

/**
 * Get Task by identifier
 * @param id - Identifier of the task
 * @returns Promise Task object
 */
const get = (boardId: string, id: string):Promise<Task | string> => tasksRepo.get(boardId, id);

/**
 * Insert Task to memory database
 * @param  task - instance of Task
 * @returns Promise Task object
 */
const insert = (task: ITask):Promise<Task> => tasksRepo.insert(task);

/**
 * Update Task by identifier with new data
 * @param id - Task identifier
 * @param task - Instance of Task class
 * @returns Updated promise Task object
 */
const update = (id: string, task: ITask):Promise<Task | string> => tasksRepo.update(id, task);

/**
 * Delete Task by a identifier
 * @param id - Task identifier
 */
const remove = (id: string):Promise<string> => tasksRepo.remove(id);

export {
  getAll,
  get,
  insert,
  update,
  remove
};
