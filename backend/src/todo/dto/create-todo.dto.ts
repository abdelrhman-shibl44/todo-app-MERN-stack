import { IsBoolean, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../schemas/todo.schema';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly is_completed: boolean;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter a correct category' })
  readonly category: Category;
}
