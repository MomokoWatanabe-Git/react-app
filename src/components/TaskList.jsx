import React from 'react'

export const TaskList = ({response}) => {
    console.log(response);
  return (
    <div>
    <h2>Task Name:</h2>
    {Array.isArray(response) && response.length > 0 && (
      <div>
        <ul>
          {response.map(task => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
  )
}
