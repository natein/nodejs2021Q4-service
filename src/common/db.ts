import { v4 as uuid } from 'uuid';
import { IUser, IBoard, ITask, IDataBase } from './types';
import User from '../resources/users/user.model';
import Board from '../resources/boards/board.model';

const db: IDataBase  = {
  users: [],
  boards: [],
  tasks: []  
};

/**
 * Fill initial data
 */ 
(() => {
  db.users.push(new User({name: "John Doe"}));
  db.users.push(new User({name: "Вася Пупкин"}));
  
  const user = new User({name: "natein"});
  db.users.push(user);
  
  const emptyBoard = new Board({ id: uuid(), title: "Доска без задач", columns:[]});
  db.boards.push(emptyBoard);
  
  const board = new Board({ id: uuid(), title: "Разработка REST API", columns:[] });
  board.addColumn("Todo");
  board.addColumn("Done");  
  db.boards.push(board);
})();

/**
 * Get all objects from table users
 * @returns Array of User objects
 */
const getAllUsers = ():IUser[] => db.users;

/**
 * Get user with specified identifier from table users
 * @param id - Entity identifier
 * @returns Instance of User or null if User not found
 */
const getUserById  = (id: string):IUser|undefined|null => {
  const items = db.users.filter(item => item.id === id);
  if(items.length === 1) {
    return items[0];
  } 
    return null;  
}

/**
 * Insert new User into table users and returns it 
 * @param item - Instance of User 
 * @returns Instance of User
 */
const insertUser = (item: IUser):IUser|undefined|null => {
  const existingItem = getUserById(item.id)
  if (!existingItem) {
    db.users.push(item);
  }
  return getUserById(item.id);
}

/**
 * Updates User with specified identifier from table users and returns it
 * @param id - entity identifier 
 * @param item - instance of User 
 * @returns - instance of User or null if User not found
 */

const updateUser = (id: string, item: IUser):IUser|undefined|null => {
  const existingItem = getUserById(id);
  if (existingItem) {
    const idx = db.users.indexOf(existingItem);
    const { name, login, password } = item;
    db.users[idx] = { id, name, login, password };
  }    
  return getUserById(id);
};

/**
 * Delete User with specified identifier from table users and 
 * update assigned tasks
 * @param id - entity identifier 
 * @returns Instance of User or null if User not found
 */
const deleteUser = (id: string):IUser|undefined|null => {
  const existingItem = getUserById(id);
    
  if (existingItem) {
    // cascading update
    db.tasks.forEach((item, idx) => {
      if (item.userId === existingItem.id) {
        const task = db.tasks[idx];
        if (task) task.userId = null;
      }
    });
    const idx = db.users.indexOf(existingItem);

    db.users = db.users.slice(0, idx).concat(db.users.slice(idx+1));
    return existingItem;    
  }
  return null;  
};

/**
 * Get all objects from table boards
 * @returns Array of Board objects
 */
const getAllBoards = ():IBoard[] => db.boards;

/**
 * Get user with specified identifier from table boards
 * @param id - Entity identifier
 * @returns Instance of Board or null if Board not found
 */
const getBoardById  = (id: string):IBoard|undefined|null => {
  const items = db.boards.filter(item => item.id === id);
  if(items.length === 1) {
    return items[0];
  } 
    return null;  
}

/**
 * Insert new User into table boards and returns it 
 * @param item - Instance of Board 
 * @returns Instance of Board
 */
const insertBoard = (item: IBoard):IBoard|undefined|null => {
  const existingItem = getBoardById(item.id)
  if (!existingItem) {
    db.boards.push(item);
  }
  return getBoardById(item.id);
}

/**
 * Updates User with specified identifier from table boards and returns it
 * @param id - entity identifier 
 * @param item - instance of Board 
 * @returns - instance of Board or null if Board not found
 */
const updateBoard = (id: string, item: IBoard):IBoard|undefined|null => {
  const existingItem = getBoardById(id);
  if (existingItem) {
    const idx = db.boards.indexOf(existingItem);
    const {  title, columns } = item;
    db.boards[idx] = { id, title, columns };
  }    
  return getBoardById(id);
};

/**
 * Delete Board with specified identifier from table boards and 
 * delete tasks from this board
 * @param id - entity identifier 
 * @returns null
 */
const deleteBoard = (id: string):IBoard|undefined|null => {
  const existingItem = getBoardById(id);
    
  if (existingItem) {
    // cascading update
    db.tasks = db.tasks.filter(item => item.boardId !== id);
    
    const idx = db.boards.indexOf(existingItem);

    db.boards = db.boards.slice(0, idx).concat(db.boards.slice(idx+1));
    return existingItem;    
  }
  return null;  
};

/**
 * Get all objects from table tasks with specified Board
 * @returns Array of Task objects
 */
const getTasksByBoard = (boardId: string):ITask[]  => db.tasks
  .filter(item => item.boardId === boardId);

/**
 * Get Task with specified identifier from table tasks
 * @param id - Entity identifier
 * @returns Instance of Task or null if Task not found
 */
const getTaskById  = (id: string):ITask|undefined|null => {
  const items = db.tasks.filter(item => item.id === id);
  if(items.length === 1) {
    return items[0];
  } 
    return null;  
}

/**
 * Insert new Task into table tasks and returns it 
 * @param item - Instance of Task 
 * @returns Instance of Task
 */
const insertTask = (item: ITask):ITask|undefined|null => {
  const existingItem = getTaskById(item.id)
  if (!existingItem) {
    db.tasks.push(item);
  }
  return getTaskById(item.id);
}

/**
 * Updates Task with specified identifier from table tasks and returns it
 * @param id - entity identifier 
 * @param item - instance of Task 
 * @returns - instance of Task or null if Task not found
 */
const updateTask = (id: string, item: ITask):ITask|undefined|null => {
  const existingItem = getTaskById(id);
  if (existingItem) {
    const idx = db.tasks.indexOf(existingItem);
    const { title, order, description, userId, boardId, columnId } = item;
    db.tasks[idx] = { id, title, order, description, userId, boardId, columnId };
  }    
  return getTaskById(id);
};

/**
 * Delete Task with specified identifier from table tasks and returns it * 
 * @param id - entity identifier 
 * @returns Instance of Task or null if Task not found
 */
const deleteTask = (id: string):ITask|undefined|null => {
  const existingItem = getTaskById(id);
    
  if (existingItem) {
    const idx = db.tasks.indexOf(existingItem);

    db.tasks = db.tasks.slice(0, idx).concat(db.tasks.slice(idx+1));
    return existingItem;    
  }
  return null;  
};

export {
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
  deleteUser,
  getAllBoards,
  getBoardById,
  insertBoard,
  updateBoard,
  deleteBoard,  
  getTasksByBoard,
  getTaskById,
  insertTask,
  updateTask,
  deleteTask,   
};
