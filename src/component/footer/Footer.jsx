import React from 'react'
import PropTypes from 'prop-types'
import TasksFilter from './TasksFilter'
import './footer.css'

function Footer({ itemsLeft, filter, onFilterChange, deleteCompletedTasks }) {
  return (
    <footer className="footer">
      <span className="todo-count">{itemsLeft} items left</span>
      <TasksFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={deleteCompletedTasks}>
        Clear completed
      </button>
    </footer>
  )
}
Footer.propTypes = {
  itemsLeft: PropTypes.number,
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
  deleteCompletedTasks: PropTypes.func.isRequired,
}
Footer.defaultProps = {
  itemsLeft: 0,
  filter: 'all'
}

export default Footer
