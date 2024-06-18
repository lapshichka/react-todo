import React from 'react';
import TasksFilter from './TasksFilter';
import './footer.css';

const Footer = ({ itemsLeft, filter, onFilterChange}) => {
  return (
    <footer className='footer'>
      <span class='todo-count'>{itemsLeft} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange}/>
    </footer>
  );
};

export default Footer;
