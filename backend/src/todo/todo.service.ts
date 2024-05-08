import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Todo } from './schemas/todo.schema';
import { isArray } from 'class-validator';
import { Query } from 'express-serve-static-core';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}

  // Find all todos with filter todos if category is selected
  async findAllTodos(query: Query): Promise<Todo[]> {
    //limit initial todos
    const resPerPage = 4;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    // filter categories
    const keyword = {};
    if (query.category) {
      // Check if cate is an array
      if (isArray(query.category)) {
        keyword['category'] = { $in: query.category };
      } else {
        // If cate is a single category, directly match the category
        keyword['category'] = query.category;
      }
    }

    return await this.todoModel.find(keyword).limit(resPerPage).skip(skip);
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
