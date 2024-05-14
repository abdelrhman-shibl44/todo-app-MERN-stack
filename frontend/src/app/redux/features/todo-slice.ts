// src/reducers/authSlice.ts
import {
  ActionReducerMapBuilder,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { AuthRegister } from "../actions/authActions";
import {
  DeleteTodo,
  TodoGet,
  TodoPost,
  TodosGet,
  UpdateTodo,
} from "../actions/todoActions";
import { TodoState, TodosList } from "../types";
import { TodoItem } from "../../../Types.common";

const initialState = {
  todosList: {
    allTodosLoaded: false,
    todos: [],
  },
  selectedTodo: {},
  limit: 4,
  loadingPost: false,
  loadingGet: false,
  isLoadingMore: false,
  error: null,
} as TodoState;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setLimit(state) {
      state.limit += 4;
    },
    setIsLoadingMore(state, action: PayloadAction<boolean>) {
      state.isLoadingMore = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<TodoState>) => {
    builder.addCase(TodoPost.pending, (state) => {
      state.loadingPost = true;
    });
    builder.addCase(
      TodoPost.fulfilled,
      (state, action: PayloadAction<TodoItem>) => {
        state.loadingPost = false;
        state.todosList.todos.push(action.payload);
      }
    );
    builder.addCase(TodoPost.rejected, (state, action) => {
      state.loadingPost = false;
      const payLoad = action.payload as { message: string };
      state.error = payLoad?.message || "An error occurred";
    });
    // Get todos
    builder.addCase(TodosGet.pending, (state) => {
      state.loadingGet = true;
    });
    builder.addCase(
      TodosGet.fulfilled,
      (state, action: PayloadAction<TodosList>) => {
        state.loadingGet = false;
        state.todosList = action.payload;
      }
    );
    builder.addCase(TodosGet.rejected, (state, action) => {
      state.loadingGet = false;
      const payLoad = action.payload as { message: string };
      state.error = payLoad?.message || "An error occurred";
    });
    // Get single todos
    builder.addCase(TodoGet.pending, (state) => {
      state.loadingGet = true;
    });
    builder.addCase(TodoGet.fulfilled, (state, action) => {
      state.selectedTodo = action.payload;
    });
    builder.addCase(TodoGet.rejected, (state, action) => {
      state.loadingGet = false;
      const payLoad = action.payload as { message: string };
      state.error = payLoad?.message || "An error occurred";
    });
    // Delete Todos
    builder.addCase(DeleteTodo.fulfilled, (state, action) => {
      const deletedTodoId = action.payload;
      state.todosList.todos = state.todosList.todos.filter(
        (todo) => todo._id?.toString() !== deletedTodoId
      );
    });
    builder.addCase(DeleteTodo.rejected, (state, action) => {
      const payLoad = action.payload as { message: string };
      state.error = payLoad?.message || "An error occurred";
    });
    // Update Todos
    builder.addCase(UpdateTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      state.todosList.todos = state.todosList.todos.map((todo) =>
        todo._id?.toString() === updatedTodo._id ? updatedTodo : todo
      );
    });
    builder.addCase(UpdateTodo.rejected, (state, action) => {
      const payLoad = action.payload as { message: string };
      state.error = payLoad?.message || "An error occurred";
    });
  },
});

export { AuthRegister };
export const { setLimit, setIsLoadingMore } = todoSlice.actions;
export default todoSlice.reducer;
