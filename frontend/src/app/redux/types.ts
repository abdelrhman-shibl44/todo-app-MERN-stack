import { TodoItem } from "@/Types.common";

// authentication
export type TAuthRegister = {
  name: string;
  email: string;
  password: string;
};

export type TAuthLogin = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  token: string | null;
  linkedinData: {
    name: string;
    title: string;
    photoUrl: string;
  };
};

export type AuthState = {
  loading: boolean;
  user: User | null;
  isAuth: boolean;
  error: string[] | string | null;
};

export type FormData = {
  email: string;
  password: string;
};

// todos
export type TodosList = {
  allTodosLoaded: boolean;
  todos: TodoItem[];
};

export type TodoState = {
  todosList: TodosList;
  selectedTodo: TodoItem | null;
  limit: number;
  loadingPost: boolean;
  loadingGet: boolean;
  isLoadingMore: boolean;
  error: string[] | string | null;
};
