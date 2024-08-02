import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow, format } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)
    const {created} = props
    this.state = {
      date: formatDistanceToNow(new Date(created)),
      isChecked: false,
      isRunning: false,
      time: '00:00'
    }
    this.seconds = new Date(0).getTime()
    this.interval = null
  }

  componentDidUpdate(prevProps, prevState) {
    const {isRunning} = this.state

    if (isRunning) {
      this.interval = setInterval(this.activateTimer, 1000)
    } else {
      this.stopInterval()
    }
  }

  componentWillUnmount() {
    this.stopInterval()
  }

  dateUpdate = () => {
    setInterval(() => {
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
    if (this.interval) {
      this.stopInterval()
    }

    const newTime = new Date(this.seconds)
    newTime.setSeconds(newTime.getSeconds() + 1)
    this.seconds = newTime.getTime()

    this.setState({time: format(newTime, 'mm:ss')})
  }

  stopInterval = () => {
    clearInterval(this.interval)
  }

  render() {
    this.dateUpdate()

    const { id, description, completed, onDeleted } = this.props
    const { date, isChecked, time, isRunning } = this.state

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
              <button type="button" aria-label='play' className="icon icon-play" onClick={() => this.setState({isRunning: true})} />
              <button type="button" aria-label='pause' className="icon icon-pause" onClick={() => this.setState({isRunning: false})} />
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
}