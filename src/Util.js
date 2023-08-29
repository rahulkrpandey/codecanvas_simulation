import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";

const initialTasks = [
  { id: uuid(), text: "Task 1" },
  { id: uuid(), text: "Task 2" },
  { id: uuid(), text: "Task 3" },
];

const Util = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && newTask.trim() !== "") {
      const newTaskItem = { id: uuid(), text: newTask };
      setTasks([...tasks, newTaskItem]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTasks = Array.from(tasks);
    const [reorderedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, reorderedTask);

    setTasks(reorderedTasks);
  };

  return (
    <div className="app">
      <h1>To-Do Application</h1>
      <div className="task-input">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={handleTaskChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks" direction="vertical">
          {(provided) => (
            <ul
              className="task-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <li
                      className="task-item"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      {task.text}
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Util;
