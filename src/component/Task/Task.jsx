import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.seconds = new Date()
    this.interval = null
    this.dateInterval = null

    const {created, dateTime: {min, sec}} = props

    this.state = {
      date: formatDistanceToNow(new Date(created)),
      isChecked: false,
      isRunning: false,
      time: this.setTime(min, sec),
      isStartingFromZero: false
    }
  }

  componentDidMount() {
    this.dateUpdate()
  }

  componentDidUpdate(prevProps, prevState) {
    const {isRunning} = this.state

    if (isRunning && !prevState.isRequired) {
      this.startTimer()
    } else if (isRunning && prevState.isRequired) {
      this.stopTimer()
    }
  }

  componentWillUnmount() {
    this.stopTimer()
    clearInterval(this.dateInterval)
  }

  dateUpdate = () => {
    this.dateInterval = setInterval(() => {
      const {created} = this.props
      this.setState(({ date }) => ({
          date: formatDistanceToNow(new Date(created), new Date()),
        }))
    }, 60000)
  }

  handle = () => {
    const { completed, id, onToggleDone } = this.props

    onToggleDone(id)
    if (completed) {
      this.setState({ isChecked: false })
    } else {
      this.setState({ isChecked: true })
    }
  }

  activateTimer = () => {
    const { isStartingFromZero, time, isRunning } = this.state
    const date = new Date(this.seconds)

    if (this.interval) clearInterval(this.interval)
    if (!isRunning) return
    
    if (time.includes('00:00')) {
      this.setState({isStartingFromZero: true})
      date.setSeconds(date.getSeconds() + 1)
    }
    else if (!time.includes('00:00')) {
      if (isStartingFromZero) {
        date.setSeconds(date.getSeconds() + 1)
        if (time.includes('59:59')) {
          this.stopTimer()
          this.setState({isRunning: false})
        }
      } else {
        date.setSeconds(date.getSeconds() - 1)
        if (time.includes('00:01')) {
          this.stopTimer()
          this.setState({isRunning: false})
        }
      }
    }
    
    this.seconds = date.getTime()

    this.setState({time: format(date, 'mm:ss')})
  }

  setTime = (min, sec) => {
    const date = new Date(this.seconds)
    date.setMinutes(min)
    date.setSeconds(sec)

    this.seconds = date.getTime()

    return format(date, 'mm:ss')
  }

  startTimer = () => {
    if (this.interval) clearInterval(this.interval)
    this.interval = setInterval(this.activateTimer, 1000)
  }

  stopTimer = () => {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  render() {
    const { id, description, completed, onDeleted } = this.props
    const { date, isChecked, time, isRunning, isStartingFromZero } = this.state

    let className = 'view'
    if (completed) {
      className += ' completed'
    }

    return (
      <div className={className}>
        {/* checked={!!completed} */}
        <input className="toggle" type="checkbox" onChange={this.handle} checked={isChecked} />

        <label htmlFor={`lable-${id}`}>
          <span className="title" onClick={this.handle} aria-hidden='true'>{description}</span>
            <span className="description">
              {isRunning
                ? <button type="button" aria-label='pause' className="icon icon-pause" onClick={() => this.setState({isRunning: false})} />
                : <button type="button" aria-label='play' className="icon icon-play" onClick={() => this.setState({isRunning: true})} />
              }
              {time}
            </span>
            <span className="description">created {date} ago</span>
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
  dateTime: PropTypes.shape({
    min: PropTypes.number,
    sec: PropTypes.number,
  }),
}
Task.defaultProps = {
  dateTime: {
    min: 0,
    sec: 0
  }
}