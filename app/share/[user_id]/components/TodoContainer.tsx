"use client";
import React, { useEffect } from "react";
import TodoList from "@/components/ui/TodoList";
import useTodosController from "../hooks/useTodosController";

interface TodoContainerProps {
  sharedUserFullName?: string;
  owenUserId?: string;
}

const TodoContainer = ({
  sharedUserFullName,
  owenUserId,
}: TodoContainerProps) => {
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
        sharedUserFullName={sharedUserFullName}
        owenUserId={owenUserId}
        loading={loading}
        todoListData={todos}
        isReadOnly={true}
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
