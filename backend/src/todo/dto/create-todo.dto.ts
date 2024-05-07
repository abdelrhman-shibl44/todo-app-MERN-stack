import { Category } from '../schemas/todo.schema';

export class CreateTodoDto {
  readonly title: string;
  readonly description: string;
  readonly author: string;
  readonly is_completed: boolean;
  readonly category: Category;
}
