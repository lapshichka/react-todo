import React from 'react';
import TodoListItem from './Task';
import './taskList.css';

const TaskList = ({todos, onDeleted}) => {
  const task = todos.map(({ id, ...item }) => {
    return (
      <li key={id}>
        <TodoListItem {...item} onDeleted={() => onDeleted(id)} />
        {/* {description.includes('Editing') && (
          <input type='text' class='edit' value='Editing task' />
        )} */}
      </li>
    );
  });

  return <ul className='todo-list'>{task}</ul>;
};

export default TaskList;
