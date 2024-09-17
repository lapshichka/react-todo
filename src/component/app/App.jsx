import React, { useState } from 'react'
import Main from '../Main/Main'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import './App.css'


export default function App() {
  let maxId = 100

  function createTodoItem(description, min, sec) {
    maxId += 1
    return {
      id: maxId,
      description,
      created: new Date().getTime(),
      completed: false,
      isEditing: false,
      time: {
        min,
        sec
      }
    }
  }

  const [data, setData] = useState([
    createTodoItem('Completed task', 0, 0),
    createTodoItem('Editing task', 0, 0),
    createTodoItem('Active task', 0, 0),
  ])
  const [filter, setFilter] = useState('all')
  

  const onFilterChange = (currentFilter) => {
    setFilter(currentFilter)
  }

  const onToggleDone = (id) => {
    setData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id)
      const oldItem = prevData[idx]
      const newItem = { ...oldItem, completed: !oldItem.completed }
      return prevData.toSpliced(idx, 1, newItem)
    })
  }

  const onToggleEditing = (id) => {
    setData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id)
      const oldItem = prevData[idx]
      const newItem = { ...oldItem, isEditing: !oldItem.isEditing }
      return prevData.toSpliced(idx, 1, newItem)
    })
  }

  const filterItem = (items, filterName) => {
    switch (filterName) {
      case 'all':
        return items
      case 'active':
        return items.filter(({ completed }) => !completed)
      case 'completed':
        return items.filter(({ completed }) => completed)
      default:
        return items
    }
  }

  const deleteItem = (id) => {
    setData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id)
      return prevData.toSpliced(idx, 1)
    })
  }

  const deleteCompletedTasks = () => {
    setData((prevData) => prevData.filter(({ completed }) => !completed))
  }

  const addItem = (text, min, sec) => {
    const newItem = createTodoItem(text, min, sec)

    setData((prevData) => [...prevData, newItem])
  }

  const editItem = (id, text) => {
    setData((prevData) => {
      const idx = prevData.findIndex((el) => el.id === id)
      const oldItem = prevData[idx]
      const newItem = { ...oldItem, description: text }
      return prevData.toSpliced(idx, 1, newItem)
    })
  }

  const visibleItems = filterItem(data, filter)
  const itemsLeftCount = data.length - data.filter(({ completed }) => completed).length

  return (
    <section className='todoapp'>
      <NewTaskForm data={data} onItemAddad={addItem} />
      <Main
        data={visibleItems}
        onDeleted={deleteItem}
        onToggleDone={onToggleDone}
        onToggleEditing={onToggleEditing}
        filter={filter}
        onFilterChange={onFilterChange}
        deleteCompletedTasks={deleteCompletedTasks}
        itemsLeft={itemsLeftCount}
        editItem={editItem}
      />
    </section>
  )
}
