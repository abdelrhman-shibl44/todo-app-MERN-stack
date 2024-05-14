import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Todo } from './schemas/todo.schema';
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
    let limit = Number(query.limit || 4);
    // filter categories
    const keyword: any = { author: user._id };
    // Check if category query parameter exists and is a string
    if (query.category) {
      if (query && typeof query.category === 'string') {
        keyword.category = { $in: (query.category as string).split(',') };
        limit = Infinity;
      }
    }
    const todos = await this.todoModel.find(keyword).limit(limit);
    const allTodosLoaded = todos.length < limit;
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
