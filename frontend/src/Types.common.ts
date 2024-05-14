// todos
export type TodoItem = {
  id?: number;
  _id?: string;
  title?: string;
  description?: string;
  category?: string[] | string;
  is_completed?: boolean;
  author?: string;
};
