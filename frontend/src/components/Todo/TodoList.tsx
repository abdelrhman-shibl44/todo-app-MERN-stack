import React from "react";
import TodoForm from "./TodoForm";
import TodoTable from "./TodoTable";
import TodoFilter from "./TodoFilter";

const TodoList = () => {
  return (
    <>
      <TodoForm />
      <TodoFilter />
      <TodoTable />
    </>
  );
};

export default TodoList;
