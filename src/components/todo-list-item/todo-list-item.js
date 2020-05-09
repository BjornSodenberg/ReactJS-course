import React, { Component } from "react";

import "./todo-list-item.css";

export default class TodoListItem extends Component {
  render() {
    const {
      label,
      onDeleted,
      onToggleImportant,
      onToggleDone,
      important,
      done,
      handleEditClick,
      editModeEnabled
    } = this.props;

    let classNames = "todo-list-item";
    if (done) {
      classNames += " done";
    }

    if (important) {
      classNames += " important";
    }

    const EditableLabel = () => {
      if (editModeEnabled) {
        return (
          <span className="todo-list-item-label" onClick={onToggleDone}>
            {label}
          </span>
        );
      } else {
        return (
          <input
            type="text"
            className="todo-list-item-label"
            defaultValue={label}
          />
        );
      }
    };

    return (
      <span className={classNames}>
        <EditableLabel />
        <button
          type="button"
          className="btn btn-outline-success btn-sm float-right"
          onClick={onToggleImportant}
        >
          <i className="fa fa-exclamation" />
        </button>

        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={onDeleted}
        >
          <i className="fa fa-trash-o" />
        </button>

        <button
          type="button"
          className="btn btn-outline-warning btn-sm float-right"
          onClick={handleEditClick}
        >
          <i className="fa fa-edit" />
        </button>
      </span>
    );
  }
}
