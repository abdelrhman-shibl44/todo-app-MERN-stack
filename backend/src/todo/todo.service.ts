import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Category, Todo } from './schemas/todo.schema';
import { isArray } from 'class-validator';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}

  // Find all todos with filter todos if category is selected
  async findAllTodos(cate?: Category): Promise<Todo[]> {
    const query = {};
    if (cate) {
      // Check if cate is an array
      if (isArray(cate)) {
        query['category'] = { $in: cate };
      } else {
        // If cate is a single category, directly match the category
        query['category'] = cate;
      }
    }

    return await this.todoModel.find(query).exec();
  }

  async createTodo(todo: Todo): Promise<Todo> {
    const res = await this.todoModel.create(todo);
    return res;
  }

  async findTodoById(id: string): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('please enter correct id.');
    }
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  async updateTodo(id: string, todo: Todo): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, todo, {
      new: true,
      runValidators: true,
    });
  }

  async deleteTodo(id: string): Promise<Todo> {
    const todo = await this.todoModel.findByIdAndDelete(id);
    return todo;
  }
}
