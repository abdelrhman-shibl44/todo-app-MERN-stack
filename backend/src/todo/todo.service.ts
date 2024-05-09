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
import { User } from '../auth/schemas/user.schema';
import { TodosRes } from './interfaces/todo.interface';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name)
    private todoModel: mongoose.Model<Todo>,
  ) {}

  // Find all todos with filter todos if category is selected
  async findAllTodos(query: Query, user: User): Promise<TodosRes> {
    //limit initial todos
    const resPerPage = 4;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    // filter categories
    const keyword: any = { author: user._id };
    if (query.category) {
      // Check if cate is an array
      if (isArray(query.category)) {
        keyword['category'] = { $in: query.category };
      } else {
        // If cate is a single category, directly match the category
        keyword['category'] = query.category;
      }
    }
    const todos = await this.todoModel
      .find(keyword)
      .limit(resPerPage)
      .skip(skip);
    const allTodosLoaded = todos.length < resPerPage;
    return { todos, allTodosLoaded };
  }
  //create todo
  async createTodo(todo: Todo, user: User): Promise<Todo> {
    const data = Object.assign(todo, { author: user._id });
    const res = await this.todoModel.create(data);
    return res;
  }
  // fine single todo
  async findTodoById(id: string): Promise<Todo> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('please enter correct id.');
    }
    const todo = await this.todoModel.findById(id);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }
  // update todo
  async updateTodo(id: string, todo: Todo): Promise<Todo> {
    return await this.todoModel.findByIdAndUpdate(id, todo, {
      new: true,
      runValidators: true,
    });
  }
  // delte todo
  async deleteTodo(id: string): Promise<Todo> {
    const todo = await this.todoModel.findByIdAndDelete(id);
    return todo;
  }
}
