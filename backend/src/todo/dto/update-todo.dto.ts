import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Category } from '../schemas/todo.schema';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsBoolean()
  readonly is_completed: boolean;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter a correct category' })
  readonly category: Category;
}
