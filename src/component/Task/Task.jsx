import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'

export default function Task({
  id,
  description,
  completed,
  isEditing,
  onDeleted,
  created,
  dateTime: {min, sec},
  onToggleDone,
  onToggleEditing,
  editItem}) {

  const [date, setDate] = useState(formatDistanceToNow(new Date(created)))
  const [isChecked, setIsChecked] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [time, setTime] = useState(format(new Date(0, 0, 0, 0, min, sec), 'mm:ss'))
  const [isStartingFromZero, setIsStartingFromZero] = useState(false)

  useEffect(() => {
    let dateInterval = null

    dateInterval = setInterval(() => {
      setDate(formatDistanceToNow(new Date(created), new Date()))
    }, 60000)
    return () => {
      clearInterval(dateInterval)
    }
  }, [created])

  useEffect(() => {
    let interval = null
    let seconds = 0
    if (time === '00:00') setIsStartingFromZero(true)

    const activateTimer = () => {
      if (!isRunning) return

      const [minute, second] = time.split(':').map(Number)
      seconds = minute * 60 + second

      if(isStartingFromZero) {
        seconds += 1
      } else if (!isStartingFromZero) {
        seconds -= 1
      }

      const newMin = Math.floor(seconds / 60)
      const newSec = seconds % 60

      const newTime = format(new Date(0, 0, 0, 0, newMin, newSec), 'mm:ss')
      setTime(newTime)

      if(newTime === '00:00' || (isStartingFromZero && newTime === '59:59')) {
        setIsRunning(false)
        clearInterval(interval)
      }
    }

    if (isRunning) {
      if (interval) clearInterval(interval)
      interval = setInterval(activateTimer, 1000)
    } else if (!isRunning && interval) {
      clearInterval(interval)
      interval = null
    }

    return () => {
      clearInterval(interval)
      interval = null
    }
  }, [isRunning, time, isStartingFromZero])

  const handleToggle = () => {
    onToggleDone(id)
    if (completed) {
      setIsChecked(false)
    } else {
      setIsChecked(true)
    }
  }

  let className = 'view'
  if (completed) {
    className += ' completed'
  }

  const [changedDescription, setChangedDescription] = useState(description)

  const onDescriptionChange = (e) => {
    setChangedDescription(e.target.value)
  }

  const onSubmit = (i, e) => {
    e.preventDefault()
    editItem(i, changedDescription)
    onToggleEditing(i)
  }

  return (
    <div className={className}>
      {isEditing 
      ? <form onSubmit={(e) => onSubmit(id, e)}>
          <input type="text" className="edit" value={changedDescription} onChange={onDescriptionChange} />
        </form>

      : <div>
        <input className="toggle" type="checkbox" onChange={handleToggle} checked={isChecked} />

          <label htmlFor={`lable-${id}`}>
            <span className="title" onClick={handleToggle} aria-hidden='true'>{description}</span>
              <span className="description">
                {isRunning
                  ? <button type="button" aria-label='pause' className="icon icon-pause" onClick={() => setIsRunning(false)} />
                  : <button type="button" aria-label='play' className="icon icon-play" onClick={() => setIsRunning(true)} />
                }
                {time}
              </span>
              <span className="description">created {date} ago</span>
          </label>
    
          <button type='button' aria-label='edit' className="icon icon-edit" onClick={onToggleEditing}/>
          <button type='button' aria-label='delete' className="icon icon-destroy" onClick={onDeleted} />
        </div>
      }
    </div>
  )
}
Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
  onToggleEditing: PropTypes.func.isRequired,
  dateTime: PropTypes.shape({
    min: PropTypes.number,
    sec: PropTypes.number,
  }),
  editItem: PropTypes.func.isRequired,
}
Task.defaultProps = {
  dateTime: {
    min: 0,
    sec: 0
  }
}