import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import { format } from 'date-fns'

import TaskAdder from '../TaskAdder'

import './Todo.css'

const MIN_TASK_NAME_LENGTH = 1

const Todo = () => {
  const [currentTaskName, setCurrentTaskName] = useState('')
  const [toDoList, setToDoList] = useState([])
  const [editLabel, setEditLabel] = useState(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)

  useEffect(() => {
    // this is the code that executes when the component LOADS
    // this is where we would get what we saved to local storage
    const toDoListParsed = JSON.parse(localStorage.getItem('toDoListLS'))
    // this is a short-circuit statement which is the same as an IF statement
    Array.isArray(toDoListParsed) && setToDoList(toDoListParsed)
  }, []) // the empty array as the second param means this useEffect will only execute ONCE ([] means no dependencies)

  useEffect(() => {
    localStorage.setItem('toDoListLS', JSON.stringify(toDoList))
  }, [toDoList]) // the dep of {toDoList} means that this code block will execute when {toDoList} changes (add, edit, delete)

  // when new todo is created
  const onTodoCreate = () => {
    setToDoList([
      ...toDoList,
      // this is what ever new todo list will start off with
      // the {currentTaskName} state variable is defined when we type it in
      {
        label: currentTaskName,
        // property names and values respectively
        isComplete: false,
        isInEditMode: false,
        // time and date created here
        dateCreated: format(new Date(), 'dd-MM-yy hh:mmaa'),
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
    setToDoList(toDoList.filter((_todo, i) => index !== i))
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
    localStorage.setItem('toDoListLS', JSON.stringify([]))
  }

  return (
    <div className="o-todo-container">
      <h1 className="c-app-header">TO DO APP</h1>

      <TaskAdder
        currentTaskName={currentTaskName}
        isButtonDisabled={isButtonDisabled}
        onTodoCreate={onTodoCreate}
        onTodoName={onTodoName}
        toDoList={toDoList}
      />

      {/* double bang - forcing a variable to be a boolean */}
      {!!toDoList.length && (
        <ul className="o-checklist">
          {/* === means compare two things, the ? means if in if else statement and : means else */}
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

            const labelField = (
              <span className={labelClass}>
                {todo.label} -{' '}
                <span className="c-date-created">
                  created on: {todo.dateCreated}
                </span>
              </span>
            )

            return (
              // TODO: move everything here into it's own component
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
      )}

      <button className="c-button" onClick={onTodoClear}>
        CLEAR
      </button>
    </div>
  )
}

export default Todo
