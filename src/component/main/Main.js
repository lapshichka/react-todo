import React, { Component } from 'react';
import TodoList from '../todoList/TaskList';
import Footer from '../footer/Footer';

export default class Main extends Component {
  state = {
    data: [
      {
        id: 1,
        description: 'Completed task',
        created: 17,
      },
      {
        id: 2,
        description: 'Editing task',
        created: 5,
      },
      {
        id: 3,
        description: 'Active task',
        created: 5,
      },
    ],
  };

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id);
      const newArr = [...data.slice(0, idx), ...data.slice(idx + 1)];

      return {
        data: newArr,
      };
    });
  };

  render() {
    return (
      <section className='main'>
        <TodoList todos={this.state.data} onDeleted={this.deleteItem} />
        <Footer />
      </section>
    );
  }
}
