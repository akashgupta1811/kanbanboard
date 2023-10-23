import React, { useState } from "react";
import Task from "./Task"; // Import the Task component
import "./kanban.css";

const columns = [
  { id: "todo", title: "Todo", canMovePrev: false, canMoveNext: true },
  {
    id: "inProgress",
    title: "In Progress",
    canMovePrev: true,
    canMoveNext: true,
  },
  { id: "done", title: "Done", canMovePrev: true, canMoveNext: false },
];

const KanbanBoard = () => {
  const [tasks, setTasks] = useState(
    columns.reduce((acc, col) => ({ ...acc, [col.id]: [] }), {})
  );
  const [taskName, setTaskName] = useState("");
  const [assignee, setAssignee] = useState("");

  const addTask = () => {
    if (taskName.trim() === "" || assignee.trim() === "") {
      return;
    }

    const newTask = {
      name: taskName,
      assignee,
    };

    setTasks((prevTasks) => ({
      ...prevTasks,
      todo: [...prevTasks.todo, newTask],
    }));
    setTaskName("");
    setAssignee("");
  };

  const getNextColumn = (currentColumnId) => {
    const currentIndex = columns.findIndex(
      (column) => column.id === currentColumnId
    );
    return columns[currentIndex + 1];
  };

  const getPrevColumn = (currentColumnId) => {
    const currentIndex = columns.findIndex(
      (column) => column.id === currentColumnId
    );
    return columns[currentIndex - 1];
  };

  const moveTask = (task, sourceColumn, targetColumn) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      const taskIndex = updatedTasks[sourceColumn].indexOf(task);
      if (taskIndex !== -1) {
        updatedTasks[sourceColumn].splice(taskIndex, 1);
        updatedTasks[targetColumn].push(task);
      }
      return updatedTasks;
    });
  };

  return (
    <div className="kanban-board">
      {columns.map((column) => (
        <div
          key={column.id}
          className="column"
          style={{ backgroundColor: "#E5E4E2" }}
        >
          <h2>{column.title}</h2>
          {tasks[column.id].map((task, index) => (
            <Task
              key={index}
              task={task}
              column={column}
              moveTask={moveTask}
              getNextColumn={getNextColumn}
              getPrevColumn={getPrevColumn}
            />
          ))}
          {column.id === "todo" && (
            <div className="task">
              <input
                type="text"
                placeholder="Task Name"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Assignee"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
              <button onClick={addTask}>Create Task</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
