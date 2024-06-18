import React from 'react';
import Task from './Task';
import './taskList.css';

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const task = todos.map(({ id, ...item }) => {
    return (
      <li key={id}>
        <Task
          {...item}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
        />
        {/* {description.includes('Editing') && (
          <input type='text' class='edit' value='Editing task' />
        )} */}
      </li>
    );
  });

  return <ul className='todo-list'>{task}</ul>;
};

export default TaskList;
