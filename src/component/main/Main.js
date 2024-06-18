import React, { Component } from 'react';
import TodoList from '../todoList/TaskList';
import Footer from '../footer/Footer';

export default class Main extends Component {
  render() {
    const { data, onDeleted, onToggleDone, filter, onFilterChange, deleteCompletedTasks } = this.props;

    const itemsLeftCount =
      data.length - data.filter(({ completed }) => completed).length;

    return (
      <section className='main'>
        <TodoList
          todos={data}
          onDeleted={onDeleted}
          onToggleDone={onToggleDone}
        />
        <Footer
          itemsLeft={itemsLeftCount}
          filter={filter}
          onFilterChange={onFilterChange}
          deleteCompletedTasks={deleteCompletedTasks}
        />
      </section>
    );
  }
}
