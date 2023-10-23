import React from "react";

const Task = ({ task, column, moveTask, getNextColumn, getPrevColumn }) => {
  return (
    <div className="task">
      <div>Name: {task.name}</div>
      <div>Assignee: {task.assignee}</div>
      <button
        onClick={() => moveTask(task, column.id, getNextColumn(column.id).id)}
        disabled={!column.canMoveNext}
      >
        Next
      </button>
      <button
        onClick={() => moveTask(task, column.id, getPrevColumn(column.id).id)}
        disabled={!column.canMovePrev}
      >
        Prev
      </button>
    </div>
  );
};

export default Task;
