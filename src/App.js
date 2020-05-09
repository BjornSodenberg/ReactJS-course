import React, { Component } from "react";
import AppHeader from "./components/app-header";
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";
import ItemStatusFilter from "./components/item-status-filter";
import ItemAddForm from "./components/item-add-form";

import "./App.css";

export default class App extends Component {
  lastID = 100;

  state = {
    todoData: [
      this.createTodoItem("Drink Coffee"),
      this.createTodoItem("Make Awesome App"),
      this.createTodoItem("Have a lunch")
    ],
    search: "",
    filter: "all"
  };

  createTodoItem(_label) {
    const newItem = {
      label: _label,
      important: false,
      done: false,
      id: this.lastID++,
      editModeEnabled: false
    };
    return newItem;
  }

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return { todoData: newArray };
    });
  };

  addItem = text => {
    this.setState(({ todoData }) => {
      const newArray = [...todoData, this.createTodoItem(text)];
      return { todoData: newArray };
    });
  };

  toggleProperty(arr, id, prop) {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [prop]: !oldItem[prop] };

    if (prop === "important" && !oldItem["important"]) {
      return [newItem, ...arr.slice(0, idx), ...arr.slice(idx + 1)];
    } else if (prop === "important" && oldItem["important"]) {
      return [...arr.slice(0, idx), ...arr.slice(idx + 1), newItem];
    } else {
      return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
    }
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  onSearchChange = search => {
    this.setState({ search });
  };

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  onFilterChange = filter => {
    this.setState({ filter });
  };

  filterItems(items, filter) {
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter(item => !item.done);
    } else if (filter === "done") {
      return items.filter(item => item.done);
    }
  }

  handleEditClick = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "editModeEnabled")
      };
    });
  };

  render() {
    const { todoData, search, filter } = this.state;
    const doneCount = +todoData.filter(el => el.done).length;
    const todoCount = +todoData.length - doneCount;
    const visibleItems = this.searchItems(
      this.filterItems(todoData, filter),
      search
    );

    return (
      <div className="todo-app">
        <AppHeader toDo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
          handleEditClick={this.handleEditClick}
        />
        <ItemAddForm onAdded={this.addItem} />
      </div>
    );
  }
}
