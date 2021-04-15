import classnames from 'classnames'
import React, { useState, useEffect } from 'react'

import './Todo.css'

const MIN_TASK_NAME_LENGTH = 1

const Todo = () => {
  const [currentTaskName, setCurrentTaskName] = useState('')
  const [toDoList, setToDoList] = useState([])
  const [editLabel, setEditLabel] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    // this is where we would get what we saved to local storage
    setToDoList(JSON.parse(localStorage.getItem('toDoListLS')))
  }, [])

  useEffect(() => {
    localStorage.setItem('toDoListLS', JSON.stringify(toDoList))
  }, [toDoList])

  // when new todo is created
  const onTodoCreate = () => {
    setToDoList([
      ...toDoList,
      // this is what ever new todo list will start off with
      // the {currentTaskName} state variable is defined when we type it in
      {
        label: currentTaskName,
        isComplete: false,
        isInEditMode: false,
      },
    ])

    setCurrentTaskName('')
    setIsButtonDisabled(true)
  }

  // when todo name is typed
  const onTodoName = (e) => {
    const textValue = e.target.value
    setCurrentTaskName(textValue)
    setIsButtonDisabled(textValue.length <= MIN_TASK_NAME_LENGTH)
  }

  // when todo is deleted
  const onTodoDelete = (index) => {
    // return false when index is equal to i (filter out)
    // return true when index is NOT equal to i (keep it)
    setToDoList(toDoList.filter((todo, i) => index !== i))
  }

  // when the checkbox on the todo is clicked (called in a loop)
  const onTodoEdit = (index, targetTodo) => {
    setToDoList([
      ...toDoList.slice(0, index),
      {
        ...targetTodo,
        isInEditMode: !targetTodo.isInEditMode,
      },
      ...toDoList.slice(index + 1),
    ])
  }

  // when the checkbox on the todo is clicked (called in a loop)
  const onTodoComplete = (index, targetTodo) => {
    setToDoList([
      ...toDoList.slice(0, index),
      {
        ...targetTodo,
        isComplete: !targetTodo.isComplete,
      },
      ...toDoList.slice(index + 1),
    ])
  }

  // when the edit input field is updated through typing (called in a loop)
  const onItemEdit = (e) => {
    setEditLabel(e.target.value)
  }

  const onTodoSave = (index, targetTodo) => {
    setToDoList([
      ...toDoList.slice(0, index),
      {
        ...targetTodo,
        label: editLabel,
        isInEditMode: false,
      },
      ...toDoList.slice(index + 1),
    ])
  }

  // when the clear all button is clicked
  const onTodoClear = () => {
    setToDoList([])
  }

  // == means compare two things but doesn't check data type (23 == '23') is true
  // === means compare two things and checks data type (23 == '23') is NOT true
  // ? means if in if else statement and
  // : means else

  return (
    <div className="o-todo-container">
      <h1 className="c-app-header">TO DO APP</h1>

      {/* default message displayed when to do list empty */}
      {/* && is an if statement with no else (called short circuit) */}
      {toDoList.length === 0 && (
        <h2 className="o-default-message">You have not added a task</h2>
      )}

      <div className="o-task-addition">
        <input
          type="text"
          className="c-input-field"
          onChange={onTodoName}
          value={currentTaskName}
        />
        <button
          className="c-button"
          onClick={onTodoCreate}
          disabled={isButtonDisabled}
        >
          Add Task
        </button>
      </div>

      <ul className="o-checklist">
        {toDoList.map((todo, index) => {
          const labelClass = classnames('c-todo-label', {
            'c-todo-label--is-complete': todo.isComplete,
          })

          const editInput = (
            <input
              className="c-edit-input-field"
              type="text"
              onChange={onItemEdit}
              defaultValue={todo.label}
            />
          )

          const labelField = <span className={labelClass}>{todo.label}</span>

          return (
            <li key={`item-${index}`} className="c-checklist-item">
              <input
                type="checkbox"
                onChange={onTodoComplete.bind(null, index, todo)}
              />

              {/* if the current todo item in the list is in EDIT MODE
                then show the edit iput field
                if not then show the regular label field */}
              {todo.isInEditMode ? editInput : labelField}

              <div className="o-button-container">
                <button
                  className="c-button"
                  onClick={onTodoDelete.bind(null, index, todo)}
                >
                  DELETE
                </button>
                <button
                  className="c-button"
                  onClick={onTodoEdit.bind(null, index, todo)}
                >
                  EDIT
                </button>
                {todo.isInEditMode && (
                  <button
                    className="c-button"
                    onClick={onTodoSave.bind(null, index, todo)}
                  >
                    SAVE
                  </button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
      <button className="c-button" onClick={onTodoClear}>
        CLEAR
      </button>
    </div>
  )
}

export default Todo
