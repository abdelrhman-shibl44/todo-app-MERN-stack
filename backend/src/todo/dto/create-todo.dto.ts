import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Category } from '../schemas/todo.schema';
import { User } from '../../auth/schemas/user.schema';

export class CreateTodoDto {
  @MinLength(4)
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @MinLength(6)
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsOptional()
  @IsBoolean()
  readonly is_completed: boolean;

  @IsNotEmpty()
  @IsString()
  @IsEnum(Category, { message: 'Please enter a correct category' })
  readonly category: Category;

  @IsEmpty({ message: 'you cannot pass user id' })
  readonly author: User;
}
