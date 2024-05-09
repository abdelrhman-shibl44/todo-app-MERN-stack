import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from '../../auth/schemas/user.schema';

export enum Category {
  WORK = 'work',
  PERSONAL = 'personal',
  SHOPPING = 'shopping',
}

@Schema({
  timestamps: true,
})
export class Todo {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  is_completed: boolean;

  @Prop()
  category: Category;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
