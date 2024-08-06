import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default class NewTaskForm extends Component {
  constructor() {
    super()
    this.state = {
      description: '',
      min: '',
      sec: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onMinutChange = (e) => {
    this.setState({
      min: e.target.value,
    })
  }

  onSecondChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    const {description, min, sec} = this.state
    const {onItemAddad} = this.props

    if (description) {
      onItemAddad(description, min, sec)
      this.setState({
        description: '',
        min: '',
        sec: '',
      })
    }
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.onSubmit()
    }
  }

  render() {
    const {description, min, sec} = this.state

    return (
      <header className="header new-todo-form">
        <h1>todos</h1>
        <form className="new-todo-form">
          <input
            type='text'
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            value={description}
            onKeyDown={this.handleKeyDown}
          />

          <input
            type='number'
            max="59"
            className="new-todo-form__timer" 
            placeholder="Min"
            onChange={this.onMinutChange}
            value={min}
            onKeyDown={this.handleKeyDown}
            required
          />

          <input
            type='number'
            max="60"
            className="new-todo-form__timer" 
            placeholder="Sec"
            onChange={this.onSecondChange}
            value={sec}
            onKeyDown={this.handleKeyDown}
            required
          />
        </form>
      </header>
    )
  }
}
NewTaskForm.propTypes = {
  onItemAddad: PropTypes.func.isRequired,
}
