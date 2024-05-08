import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  // Get all todos with filter todos if category is selected
  @Get()
  async getAllTodos(@Query() query?: ExpressQuery): Promise<Todo[]> {
    return this.todoService.findAllTodos(query);
  }

  // Add a todo
  @Post()
  async createTodo(
    @Body()
    todo: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.createTodo(todo);
  }

  // Get a todo
  @Get(':id')
  async getTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findTodoById(id);
  }

  // Update a todo
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() todo: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, todo);
  }

  // Delete a todo
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteTodo(id);
  }
}
