import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  ALL = 'all',
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

  @Prop()
  author: string;

  @Prop({ default: false })
  is_completed: boolean;

  @Prop({ default: 'all' })
  category: Category;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
