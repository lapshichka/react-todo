import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Task from '../Task/Task'
import './TaskList.css'

function TaskList({ todos, onDeleted, onToggleDone, onToggleEditing, editItem }) {
  const task = todos.map(({ id, description, created, isEditing, completed, time }) => (
    <li key={id}>
      <Task
        id={id}
        description={description}
        created={created}
        completed={completed}
        isEditing={isEditing}
        dateTime={time}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEditing={() => onToggleEditing(id)}
        editItem={editItem}
      />
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
      isEditing: PropTypes.bool.isRequired,
      time: PropTypes.shape({
        min: PropTypes.number.isRequired,
        sec: PropTypes.number.isRequired,
      }),
    })
  ),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
}
TaskList.defaultProps = {
  todos: []
}

export default TaskList
