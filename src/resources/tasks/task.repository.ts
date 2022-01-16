import { getRepository } from 'typeorm';
import { ITask } from '../../common/types';
import Task from'../../entities/task.model';

/**
 * Get all tasks of the board with specified identifier
 * @param boardId - Identifier of the board
 * @returns Promise Array of Task objects
 */
const getAll = async (boardId: string): Promise<Task[]> => {
  const taskRepository = getRepository(Task);
  return taskRepository.find({where: {boardId}, loadRelationIds: true});
}

/**
 * Get Task with specified identifier
 * @param id - Identifier of the task
 * @returns Promise Task object
 */
const get = async (boardId: string, id: string): Promise<Task | 'NOT_FOUND'> => {
  const taskRepository = getRepository(Task);
  const res = await taskRepository.findOne(id, { where: { boardId }, loadRelationIds: true });
  if (res === undefined) return 'NOT_FOUND';
  return res;
};

/**
 * Insert Task to database
 * @param task - instance of Task class
 * @returns Promise Task object
 */
const insert = async (task: ITask): Promise<Task> => {
  const taskRepository = getRepository(Task);
  const insertedTask = taskRepository.create(task);
  return taskRepository.save(insertedTask);
}

/**
 * Update Task by identifier with new data
 * @param id - Task identifier
 * @param task - Instance of Task class
 * @returns Updated promise Task object
 */
const update = async (id: string, task: ITask): Promise<Task | 'NOT_FOUND'> => {
  const taskRepository = getRepository(Task);
  const taskById = await taskRepository.findOne({id});
  if (taskById) {
    return taskRepository.save({...taskById, ...task});
  }
  return 'NOT_FOUND';
};

/**
 * Delete Task by a identifier.
 * @param id - Task identifier.
 */
const remove = async (id: string): Promise<'DELETED' | 'NOT_FOUND' > => {  
  const taskRepository = getRepository(Task);
  const res = await taskRepository.findOne(id);
  if (res === undefined) return 'NOT_FOUND';
  await taskRepository.delete({id});
  return 'DELETED';
};

export {
  getAll,
  get,
  remove,
  insert,
  update
};
