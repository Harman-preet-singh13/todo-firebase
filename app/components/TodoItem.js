
import React from 'react';

const ToDoItem = ({ task }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Due Date: {task.dueDate}</p>
      <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default ToDoItem;
