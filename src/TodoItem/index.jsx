import React from 'react'

const TodoItem = ({
  index,
  todo,
  onTodoDelete,
  onTodoComplete,
  // isInEditMode,
  editInput,
  labelField,
  onTodoEdit,
  onTodoSave,
}) => {
  return (
    <li key={`item-${index}`} className="c-checklist-item">
      {todo.label}
      <input
        type="checkbox"
        onChange={onTodoComplete.bind(null, index, todo)}
      />{' '}
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
}

export default TodoItem
