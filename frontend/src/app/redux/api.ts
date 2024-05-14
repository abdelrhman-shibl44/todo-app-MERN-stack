import axios from "axios";
import { FormData } from "./types";
import { TodoItem } from "@/Types.common";

const API = axios.create({ baseURL: "http://localhost:3001" });
// authentication
export const loginIn = (formData: FormData) =>
  API.post("/auth/login", formData);

export const signUp = (formData: FormData) =>
  API.post("/auth/signup", formData);

// todos
export const addTodo = (formData: TodoItem, token: string) =>
  API.post("/todos", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getTodos = (token: string, cates?: string[], limit?: number) =>
  API.get("/todos", {
    params: {
      category: cates?.join(","),
      limit: cates && cates.length > 0 ? undefined : limit || 4,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
// Get single todo
export const getTodo = (token: string, todoId: string) =>
  API.get(`/todos/${todoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const deleteTodos = (token: string, todoId: string) =>
  API.delete(`/todos/${todoId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateTodos = (
  formData: TodoItem,
  token: string,
  todoId: string
) =>
  API.put(`/todos/${todoId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
