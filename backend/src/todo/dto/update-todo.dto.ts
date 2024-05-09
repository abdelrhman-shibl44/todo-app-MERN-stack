import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/todo.schema';
import { User } from '../../auth/schemas/user.schema';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsBoolean()
  readonly is_completed: boolean;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter a correct category' })
  readonly category: Category;

  @IsEmpty({ message: 'you cannot pass user id' })
  readonly author: User;
}
