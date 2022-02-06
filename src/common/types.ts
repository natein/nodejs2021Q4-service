interface IUser {
  id: string;
  name: string;
  login: string;
  password: string;
}

interface IUserToResponse {
  id: string;
  name: string;
  login: string;
}

interface IColumn {
  id: string;
  title: string;
  order: number;
}

interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string | null;
  boardId: string;
  columnId: string;
}

interface ICredentials {
  login: string;
  password: string;
}

export {
  IUser,
  IUserToResponse,
  IBoard,
  ITask,
  IColumn,
  ICredentials
};
