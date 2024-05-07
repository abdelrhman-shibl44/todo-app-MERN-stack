import { Category } from '../schemas/todo.schema';

export class UpdateTodoDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly completed: boolean;
  readonly category: Category;
}
