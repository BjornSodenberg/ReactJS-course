import React from "react";
import TodoListItem from "../todo-list-item";

import "./todo-list.css";

export default function TodoList({
  todos,
  onDeleted,
  onToggleImportant,
  onToggleDone,
  handleEditClick
}) {
  const items = todos.map(item => {
    const { id, ...itemProps } = item;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleImportant={() => onToggleImportant(id)}
          onToggleDone={() => onToggleDone(id)}
          handleEditClick={() => handleEditClick(id)}
        />
      </li>
    );
  });

  return <ul className="list-group todo-list">{items}</ul>;
}
