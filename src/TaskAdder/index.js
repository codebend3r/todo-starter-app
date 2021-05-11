import React from 'react'

const TaskAdder = ({
  currentTaskName,
  isButtonDisabled,
  onTodoCreate,
  onTodoName,
  toDoList,
}) => {
  return (
    <div className="o-task-addition">
      <input
        type="text"
        className="c-input-field"
        onChange={onTodoName}
        value={currentTaskName}
        placeholder={`${
          toDoList && toDoList.length === 0
            ? 'Please type here to start adding todos'
            : 'add some more todos'
        }`}
      />
      <button
        className="c-button"
        onClick={onTodoCreate}
        disabled={isButtonDisabled}
      >
        ADD TASK
      </button>
    </div>
  )
}

export default TaskAdder
