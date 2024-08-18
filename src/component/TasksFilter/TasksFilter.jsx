import React from 'react'
import PropTypes from 'prop-types'
import './TasksFilter.css'

export default function TasksFilter({ filter, onFilterChange }) {
  const btn = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = btn.map(({ name, label }) => {
    const isActive = filter === name
    const className = isActive ? 'selected' : null

    return (
      <li key={name}>
        <button type="button" className={className} onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    )
  })
  
  return <ul className='filters'>{buttons}</ul>
}
TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
}
TasksFilter.defaultProps = {
  filter: 'all'
}
