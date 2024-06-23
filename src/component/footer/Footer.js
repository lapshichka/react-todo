import React from 'react';
import TasksFilter from './TasksFilter';
import './footer.css';

const Footer = ({ itemsLeft, filter, onFilterChange, deleteCompletedTasks }) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>{itemsLeft} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button className='clear-completed' onClick={deleteCompletedTasks}>Clear completed</button>
    </footer>
  );
};

export default Footer;
