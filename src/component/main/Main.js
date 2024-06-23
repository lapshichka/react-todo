import React, { Component } from 'react';
import propTypes from 'prop-types';
import TodoList from '../todoList/TaskList';
import Footer from '../footer/Footer';

export default class Main extends Component {
  static defaultProps = {
    filter: 'all',
  };

  static propTypes = {
    data: propTypes.object,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func,
    filter: propTypes.string,
    onFilterChange: propTypes.func,
    deleteCompletedTasks: propTypes.func,
  };

  render() {
    console.log(React.Children.count());
    const {
      data,
      onDeleted,
      onToggleDone,
      filter,
      onFilterChange,
      deleteCompletedTasks,
    } = this.props;

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
