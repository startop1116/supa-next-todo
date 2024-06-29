"use client";
import React, { useEffect } from "react";
import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

const TodoContainer = () => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onDeleteTodos,
    onSearchTodos,
    onUpdateTodos,
  } = useTodosController();

  return (
    <div>
      <TodoList
        sharedUserFullName="hhcode"
        owenUserId="123123"
        loading={loading}
        todoListData={todos}
        isReadOnly={false}
        onUpdate={(id, content) => {
          onUpdateTodos(id, content);
        }}
        onCreate={() => {
          onCreateEmptyTodos();
        }}
        onDelete={(id) => {
          onDeleteTodos(id);
        }}
        onSearch={(terms) => {
          onSearchTodos(terms);
        }}
      />
    </div>
  );
};

export default TodoContainer;
