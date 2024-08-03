import React from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ todos, onDeleted, onToggleDone }) {
  const task = todos.map(({ id, description, created, completed, time }) => (
    <li key={id}>
      <Task
        id={id}
        description={description}
        created={created}
        completed={completed}
        dateTime={time}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
      {/* {description.includes('Editing') && (
          <input type='text' class='edit' value='Editing task' />
        )} */}
    </li>
  ))

  return <ul className="todo-list">{task}</ul>
}
TaskList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      time: PropTypes.shape({
        min: PropTypes.number.isRequired,
        sec: PropTypes.number.isRequired,
      }),
    })
  ),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}
TaskList.defaultProps = {
  todos: []
}

export default TaskList
