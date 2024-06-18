import React, { Component } from 'react';
import './tasksFilter.css';

export default class TasksFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  render() {
    const { filter, onFilterChange } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActive = filter === name;
      const className = isActive ? 'selected' : null;

      return (
        <li key={name}>
          <button className={className} onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });
    return <ul className='filters'>{buttons}</ul>;
  }
}
