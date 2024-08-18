import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

export default function NewTaskForm({onItemAddad}) {
  const [description, setDescription] = useState('')
  const [time, setTime] = useState({
    min: '',
    sec: '',
  })

  const onLabelChange = (e) => {
    setDescription(e.target.value)
  }

  const onMinutChange = (e) => {
    setTime(state => ({
      ...state,
      min: e.target.value,
    }))
  }

  const onSecondChange = (e) => {
    setTime(state => ({
      ...state,
      sec: e.target.value,
    }))
  }

  const onSubmit = () => {
    if (description) {
      onItemAddad(description, time.min, time.sec)
      setDescription('')
      setTime({
        min: '',
        sec: '',
      })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <header className="header new-todo-form">
      <h1>todos</h1>
      <form className="new-todo-form">
        <input
          type='text'
          className="new-todo"
          placeholder="Task"
          onChange={onLabelChange}
          value={description}
          onKeyDown={handleKeyDown}
        />

        <input
          type='number'
          max="59"
          className="new-todo-form__timer" 
          placeholder="Min"
          onChange={onMinutChange}
          value={time.min}
          onKeyDown={handleKeyDown}
          required
        />

        <input
          type='number'
          max="60"
          className="new-todo-form__timer" 
          placeholder="Sec"
          onChange={onSecondChange}
          value={time.sec}
          onKeyDown={handleKeyDown}
          required
        />
      </form>
    </header>
  )
}
NewTaskForm.propTypes = {
  onItemAddad: PropTypes.func.isRequired,
}
