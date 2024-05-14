"use client";
import React, { useEffect } from "react";
import TodoHead from "./TodoHead";
import Todo from "./Todo";
import Button from "../ui-controls/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import { TodosGet } from "../../app/redux/actions/todoActions";
import {
  setIsLoadingMore,
  setLimit,
} from "../../app/redux/features/todo-slice";

const TodoTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todosList, loadingGet, error, limit, isLoadingMore } = useSelector(
    (state: RootState) => state.todo
  );
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  useEffect(() => {
    dispatch(TodosGet({ limit }))
      .unwrap()
      .then(() => {
        dispatch(setIsLoadingMore(false));
      })
      .catch((err) => {
        dispatch(setIsLoadingMore(false));
      });
  }, [limit]);

  const checkTodos = !isAuth
    ? "Please Login to see & create todos"
    : error
    ? "Error loading Todos"
    : todosList.todos?.length === 0
    ? "There are no todos available"
    : todosList.allTodosLoaded
    ? "All todos Loaded :)"
    : "";

  const handleLoadMore = () => {
    dispatch(setIsLoadingMore(true));
    dispatch(setLimit());
  };
  return (
    <div className="relative text-center pb-5 overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50/80 dark:bg-black/80 dark:text-gray-400">
          <TodoHead />
        </thead>
        <tbody className="text-center w-fit mx-auto">
          {isAuth &&
            todosList &&
            todosList.todos.map((todo, idx) => (
              <Todo
                key={todo?._id}
                id={idx}
                _id={todo?._id}
                title={todo?.title}
                description={todo?.description}
                is_completed={todo?.is_completed}
                category={todo?.category}
              />
            ))}
        </tbody>
      </table>
      {!loadingGet && checkTodos && (
        <p className="text-center text-slate-500 dark:text-slate-200 font-semibold border dark:bg-slate-800/70 border-slate-100 bg-slate-100/70 dark:border-slate-700 w-fit mx-auto p-2 px-6 rounded-b-md border-t-0">
          {checkTodos}
        </p>
      )}
      {!checkTodos && (
        <Button
          className="bg-slate-200 dark:bg-slate-800 font-semibold p-2 w-60 mx-auto rounded-b-md shadow"
          isFormLoading={isLoadingMore}
          onClick={handleLoadMore}
          text="Load More"
        />
      )}
    </div>
  );
};

export default TodoTable;
