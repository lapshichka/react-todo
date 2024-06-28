import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './newTaskForm.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onSubmit = (e) => {
    const {description} = this.state
    const {onItemAddad} = this.props

    if (description) {
      e.preventDefault()
      onItemAddad(description)
      this.setState({
        description: '',
      })
    }
  }

  render() {
    const {description} = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            // autoFocus
            onChange={this.onLabelChange}
            value={description}
          />
        </form>
      </header>
    )
  }
}
NewTaskForm.propTypes = {
  onItemAddad: PropTypes.func.isRequired,
}
