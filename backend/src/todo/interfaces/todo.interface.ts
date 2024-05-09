import { Todo } from '../schemas/todo.schema';

export type TodosRes = {
  todos: Todo[];
  allTodosLoaded: boolean;
};
