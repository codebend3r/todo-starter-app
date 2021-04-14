import React, { useState } from 'react'
import classnames from 'classnames'

import './Todo.css'

const MIN_TASK_NAME_LENGTH = 1

const Todo = () => {
  const [currentTaskName, setCurrentTaskName] = useState('')
  const [toDoList, setToDoList] = useState([])
  const [editLabel, setEditLabel] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

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

  // when the checkbox on the todo is clicked
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

  return (
    <div className="o-todo-container">
      <h1>TODO APP</h1>

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
        {!!toDoList.length ? (
          toDoList.map((todo, index) => {
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
          })
        ) : (
          <span>No todos</span>
        )}
      </ul>
      <button className="c-button" onClick={onTodoClear}>
        CLEAR
      </button>
    </div>
  )
}

export default Todo
