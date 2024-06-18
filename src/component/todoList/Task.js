import React, { Component } from 'react';

export default class Task extends Component {
  render() {
    const { description, created, completed, onDeleted, onToggleDone } = this.props;

    let className = 'view';
    if (completed) {
      className += ' completed';
    }

    return (
      <div className={className}>
        <input class='toggle' type='checkbox' />

        <label>
          <span class='description' onClick={onToggleDone}>
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
