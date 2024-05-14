import { createAsyncThunk } from "@reduxjs/toolkit";
import { addTodo, deleteTodos, getTodo, getTodos, updateTodos } from "../api";
import { RootState } from "../store";
import { TodoItem } from "@/Types.common";
import { TodosList } from "../types";

const TodoPost = createAsyncThunk(
  "todos/add",
  async (formData: TodoItem, { rejectWithValue, getState }) => {
    const { user } = (getState() as RootState).auth;
    try {
      const { data } = await addTodo(formData, user?.token!);
      return data as TodoItem;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const TodosGet = createAsyncThunk(
  "todos/get",
  async (
    {
      cates,
      limit,
    }: { cates?: string[] | undefined; limit?: number | undefined },
    { rejectWithValue, getState }
  ) => {
    const { user } = (getState() as RootState).auth;

    if (!user || !user.token) {
      return rejectWithValue("User token is not available");
    }
    try {
      const { data } = await getTodos(user.token, cates, limit);
      return data as TodosList;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
// Get single todo
const TodoGet = createAsyncThunk(
  "todo/get",
  async (todoId: string, { rejectWithValue, getState }) => {
    const { user } = (getState() as RootState).auth;

    if (!user || !user.token) {
      return rejectWithValue("User token is not available");
    }
    try {
      const { data } = await getTodo(user.token, todoId);
      return data as TodoItem;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk action creator for deleting a todo
const DeleteTodo = createAsyncThunk(
  "todos/delete",
  async (todoId: string, { rejectWithValue, getState }) => {
    const { user } = (getState() as RootState).auth;
    if (!user || !user.token) {
      return rejectWithValue("User token is not available");
    }

    try {
      await deleteTodos(user.token, todoId);
      return todoId;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
// Async thunk action creator for deleting a todo
const UpdateTodo = createAsyncThunk(
  "todos/update",
  async (
    { formData, todoId }: { formData: TodoItem; todoId: string },
    { rejectWithValue, getState }
  ) => {
    console.log(formData);
    const { user } = (getState() as RootState).auth;
    if (!user || !user.token) {
      return rejectWithValue("User token is not available");
    }

    try {
      const { data } = await updateTodos(formData, user.token, todoId);
      return data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export { TodoPost, TodosGet, TodoGet, DeleteTodo, UpdateTodo };
