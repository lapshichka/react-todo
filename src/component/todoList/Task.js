import React, { Component } from 'react';
import { formatDistanceToNow } from 'https://unpkg.com/date-fns/formatDistanceToNow.mjs';

export default class Task extends Component {
  state = {
    date: formatDistanceToNow(this.props.created),
  };

  dateUpdate = () => {
    setInterval(() => {
      this.setState(({ date }) => {
        console.log(date);
        return {
          date: formatDistanceToNow(this.props.created),
        };
      });
    }, 60000);
  };

  render() {
    this.dateUpdate();

    const { description, completed, onDeleted, onToggleDone } =
      this.props;

    let className = 'view';
    if (completed) {
      className += ' completed';
    }

    return (
      <div className={className}>
        <input className='toggle' type='checkbox' />

        <label>
          <span className='description' onClick={onToggleDone}>
            {description}
          </span>
          <span className='created'>created {this.state.date} ago</span>
        </label>

        <button className='icon icon-edit'></button>
        <button className='icon icon-destroy' onClick={onDeleted}></button>
      </div>
    );
  }
}
