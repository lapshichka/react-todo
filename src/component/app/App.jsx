import React, { Component } from 'react'
import { format } from 'date-fns'
import Main from '../Main/Main'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import './App.css'


export default class App extends Component {
  constructor() {
    super()
    this.maxId = 100
    this.state = {
      data: [
        this.createTodoItem('Completed task', 0, 0),
        this.createTodoItem('Editing task', 0, 0),
        this.createTodoItem('Active task', 0, 0),
      ],
      filter: 'all',
    }
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  onToggleDone = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id)
      const oldItem = data[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }

      return {
        data: data.toSpliced(idx, 1, newItem),
      }
    })
  }

  filterItem = (items, filterName) => {
    switch (filterName) {
      case this.filter:
        return items
      case 'active':
        return items.filter(({ completed }) => !completed)
      case 'completed':
        return items.filter(({ completed }) => completed)
      default:
        return items
    }
  }

  deleteItem = (id) => {
    this.setState(({ data }) => {
      const idx = data.findIndex((el) => el.id === id)
      const newArr = data.toSpliced(idx, 1)

      return {
        data: newArr,
      }
    })
  }

  deleteCompletedTasks = () => {
    this.setState(({ data }) => ({
        data: data.filter(({ completed }) => !completed),
      }))
  }

  addItem = (text, min, sec) => {
    const newItem = this.createTodoItem(text, min, sec)

    this.setState(({ data }) => ({
        data: [...data, newItem],
      }))
  }
  
  createTodoItem(description, min, sec) {
    this.maxId += 1
    return {
      id: this.maxId,
      description,
      created: new Date().getTime(),
      completed: false,
      time: {
        min,
        sec
      }
    }
  }

  render() {
    const { data, filter } = this.state

    const visibleItems = this.filterItem(data, filter)
    const itemsLeftCount = data.length - data.filter(({ completed }) => completed).length

    return (
      <section className='todoapp'>
        <NewTaskForm data={data} onItemAddad={this.addItem} />
        <Main
          data={visibleItems}
          onDeleted={this.deleteItem}
          onToggleDone={this.onToggleDone}
          filter={filter}
          onFilterChange={this.onFilterChange}
          deleteCompletedTasks={this.deleteCompletedTasks}
          itemsLeft={itemsLeftCount}
        />
      </section>
    )
  }
}
