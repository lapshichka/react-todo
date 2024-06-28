import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    const {created} = props
    this.state = {
      date: formatDistanceToNow(created),
    }
  }

  dateUpdate = () => {
    setInterval(() => {
      this.setState(({ date }) => ({
          date: formatDistanceToNow(this.created),
        }))
    }, 60000)
  }

  render() {
    this.dateUpdate()

    const { id, description, completed, onDeleted, onToggleDone } = this.props
    const { date } = this.state

    let className = 'view'
    if (completed) {
      className += ' completed'
    }

    return (
      <div className={className}>
        <input className="toggle" type="checkbox" />

        <label htmlFor={`lable-${id}`}>
          <span className="description" onClick={onToggleDone} aria-hidden='true'>
            {description}
          </span>
          <span className="created">created {date} ago</span>
        </label>

        <button type='button' aria-label='edit' className="icon icon-edit" />
        <button type='button' aria-label='delete' className="icon icon-destroy" onClick={onDeleted} />
      </div>
    )
  }
}
Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}