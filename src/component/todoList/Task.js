import React, { Component } from 'react';

export default class Task extends Component {
  state = {
    completed: false,
    editing: false,
  };
  onDescriptionClick = () => {
    this.setState((state) => {
      return {
        completed: !state.completed,
      };
    });
  };

  render() {
    const { description, created, onDeleted } = this.props;
    const { completed, editing } = this.state;

    let className = 'view';
    if (completed) {
      className += ' completed';
    }

    return (
      <div className={className}>
        <input class='toggle' type='checkbox' />

        <label>
          <span class='description' onClick={this.onDescriptionClick}>
            {description}
          </span>
          <span class='created'>created {created} seconds ago</span>
        </label>

        <button class='icon icon-edit'></button>
        <button class='icon icon-destroy' onClick={onDeleted}></button>
      </div>
    );
  }
}
