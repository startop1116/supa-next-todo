"use client";
import React from "react";
import TodoList from "@/components/ui/TodoList";
import useTodosController from "../hooks/useTodosController";

interface TodoContainerProps {
  owenUserId?: string;
}

const TodoContainer = ({ owenUserId }: TodoContainerProps) => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onDeleteTodos,
    onSearchTodos,
    onUpdateTodos,
  } = useTodosController(owenUserId);

  return (
    <div>
      <TodoList
        owenUserId={owenUserId}
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
