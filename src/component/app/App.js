import React, { Component } from 'react';
import NewTaskForm from '../newTaskForm/NewTaskForm';
import Main from '../main/Main';
import './app.css';

export default class App extends Component {
  maxId = 100;

  state = {
    data: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'all',
  };

  createTodoItem(description) {
    return {
      id: this.maxId++,
      description,
      created: new Date().getTime(),
      completed: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const newArr = data.toSpliced(idx, 1);

      return {
        data: newArr,
      };
    });
  };
  deleteCompletedTasks = () => {
    this.setState(({ data }) => {
      return {
        data: data.filter(({ completed }) => !completed),
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ data }) => {
      return {
        data: [...data, newItem],
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const oldItem = data[idx];
      const newItem = { ...oldItem, completed: !oldItem.completed };

      return {
        data: data.toSpliced(idx, 1, newItem),
      };
    });
  };

  filterItem = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(({ completed }) => !completed);
      case 'completed':
        return items.filter(({ completed }) => completed);
      default:
        return items;
    }
  };
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { data, filter } = this.state;

    const visibleItems = this.filterItem(data, filter);

    return (
      <section className='todoapp'>
        <NewTaskForm data={data} onItemAddad={this.addItem} />
        <Main
          data={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          filter={filter}
          onFilterChange={this.onFilterChange}
          deleteCompletedTasks={this.deleteCompletedTasks}
        />
      </section>
    );
  }
}
