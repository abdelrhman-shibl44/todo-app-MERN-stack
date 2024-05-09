import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/schemas/user.schema';
import { TodosRes } from './interfaces/todo.interface';

@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}
  // Get all todos with filter todos if category is selected
  @Get()
  @UseGuards(AuthGuard())
  async getAllTodos(
    @Req() req,
    @Query()
    query?: ExpressQuery,
  ): Promise<TodosRes> {
    return this.todoService.findAllTodos(query, req.user as User);
  }

  // Add a todo
  @Post()
  @UseGuards(AuthGuard())
  async createTodo(
    @Body()
    todo: CreateTodoDto,
    @Req() req,
  ): Promise<Todo> {
    return this.todoService.createTodo(todo, req.user);
  }

  // Get a todo
  @Get(':id')
  @UseGuards(AuthGuard())
  async getTodo(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findTodoById(id);
  }

  // Update a todo
  @Put(':id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() todo: UpdateTodoDto,
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, todo);
  }

  // Delete a todo
  @Delete(':id')
  @UseGuards(AuthGuard())
  async remove(@Param('id') id: string): Promise<Todo> {
    return this.todoService.deleteTodo(id);
  }
}
