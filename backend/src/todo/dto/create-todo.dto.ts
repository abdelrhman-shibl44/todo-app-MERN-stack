import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/todo.schema';
import { User } from '../../auth/schemas/user.schema';

export class CreateTodoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly is_completed: boolean;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter a correct category' })
  readonly category: Category;

  @IsEmpty({ message: 'you cannot pass user id' })
  readonly author: User;
}
