import React from 'react';
import TasksFilter from './TasksFilter';
import './footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <span class='todo-count'>1 items left</span>
      <TasksFilter />
    </footer>
  );
};

export default Footer;
