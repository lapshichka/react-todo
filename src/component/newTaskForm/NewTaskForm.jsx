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

  onSecondsChange = (e) => {
    this.setState({
      sec: e.target.value,
    })
  }

  onSubmit = (e) => {
    const {description, min, sec} = this.state
    const {onItemAddad} = this.props

    if (description && min || sec) {
      e.preventDefault()
      onItemAddad(description, min, sec)
      this.setState({
        description: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const {description, min, sec} = this.state

    return (
      <header className="header new-todo-form">
        <h1>todos</h1>
        <form id="form1" className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type='text'
            className="new-todo"
            placeholder="Task"
            onChange={this.onLabelChange}
            value={description}
            form='form1'
          />

          <input
            type='number'
            max="59"
            className="new-todo-form__timer" 
            placeholder="Min" 
            onChange={this.onMinutChange}
            value={min}
            form='form1'
          />

          <input 
            type='number'
            max="60"
            className="new-todo-form__timer" 
            placeholder="Sec" 
            onChange={this.onSecondsChange}
            value={sec}
            form='form1'
          />

          <input value="add" type="submit" className='new-todo__submit' />
        </form>
      </header>
    )
  }
}
NewTaskForm.propTypes = {
  onItemAddad: PropTypes.func.isRequired,
}
