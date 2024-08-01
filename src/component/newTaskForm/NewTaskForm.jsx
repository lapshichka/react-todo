import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

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
      <header className="header new-todo-form">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type='text'
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            value={description}
          />
        </form>
        <input type='text' className="new-todo-form__timer" placeholder="Min" />
        <input type='text' className="new-todo-form__timer" placeholder="Sec" />
      </header>
    )
  }
}
NewTaskForm.propTypes = {
  onItemAddad: PropTypes.func.isRequired,
}
