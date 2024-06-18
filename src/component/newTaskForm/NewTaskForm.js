import React, { Component } from 'react';
import './newTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    description: '',
  };

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    if (this.state.description) {
      e.preventDefault();
      this.props.onItemAddad(this.state.description);
      this.setState({
        description: '',
      });
    }
  };

  render() {
    return (
      <header class='header'>
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            class='new-todo'
            placeholder='What needs to be done?'
            autofocus
            onChange={this.onLabelChange}
            value={this.state.description}
          />
        </form>
      </header>
    );
  }
}
