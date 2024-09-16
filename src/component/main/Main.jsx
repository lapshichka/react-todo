import React from 'react'
import PropTypes from 'prop-types'
import TaskList from '../TaskList/TaskList'
import Footer from '../Footer/Footer'
import './Main.css'


export default function Main({ data, onDeleted, onToggleDone, filter, onFilterChange, deleteCompletedTasks, itemsLeft, onToggleEditing, editItem }) {
  return (
    <section className="main">
      <TaskList
        todos={data}
        onDeleted={onDeleted}
        onToggleDone={onToggleDone}
        onToggleEditing={onToggleEditing}
        editItem={editItem}
      />
      <Footer
        itemsLeft={itemsLeft}
        filter={filter}
        onFilterChange={onFilterChange}
        deleteCompletedTasks={deleteCompletedTasks}
      />
    </section>
  )
}

Main.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      created: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEditing:  PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  deleteCompletedTasks: PropTypes.func.isRequired,
  itemsLeft: PropTypes.number.isRequired,
  editItem: PropTypes.func.isRequired,
}
Main.defaultProps = {
  data: []
}
