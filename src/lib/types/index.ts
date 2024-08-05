export type CreateTodoInput = {
  task: string;
};

export type UpdateTodoInput = {
  id: number;
  task: string;
  completed: boolean;
};
export type DeleteTodoInput = {
  id: number;
};

export interface TodoInterface {
  id: number;
  task: string;
  completed: boolean;
}

export type FetchTodosResponse = TodoInterface[];
