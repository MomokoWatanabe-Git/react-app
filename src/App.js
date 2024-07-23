import React, { useState } from 'react';
import axios from 'axios';
import { Title } from "./components/Title";
import { TaskList } from './components/TaskList';

const App = () => {
  const [response, setResponse] = useState('');
  const [taskId, setTaskId] = useState('');
  //ここを直す
  const [taskData, setTaskData] = useState({ id: '', name: '', isCompleted:'' });

  const handleGetAllTasks = async () => {
    try {
      const res = await axios.get('http://localhost:5057/tasks');
      console.log(res.data);
      setResponse(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGetTaskById = async () => {
    try {
      const res = await axios.get(`http://localhost:5057/tasks/${taskId}`);
      console.log(res.data);
      //mapを使用しているから配列でしか動かない[]を使用する、typescriptを使う
      setResponse([res.data]);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:5057/tasks/${taskId}`);
      console.log(`Task with ID ${taskId} deleted`);
      setResponse([`Task with ID ${taskId} deleted`]);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
//ここを修正
  const handleCreateTask = async () => {
    if (!taskData) {
      alert('Task data cannot be empty');
      return;
    }
//ここを修正
    const isCompletedValue = taskData.isCompleted.toLowerCase() === 'true';
    try {
      const res = await axios.post('http://localhost:5057/tasks', {
        id: taskData.id,
        name:taskData.name,
        isCompleted:isCompletedValue,
      });
      console.log(res.data);
      setResponse([res.data]);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className="body">
      <Title />
      <button onClick={handleGetAllTasks}>全てのタスクを取得</button>
      <div>
        <input
          type="text"
          placeholder="Task ID"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        />
        <button onClick={handleGetTaskById}>IDでタスクを取得</button>
        <button onClick={handleDeleteTask}>IDでタスクを削除</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Task ID"
          value={taskData.id}
          onChange={(e) => setTaskData({ ...taskData, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Name"
          value={taskData.name}
          onChange={(e) => setTaskData({ ...taskData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task isCompleted"
          value={taskData.isCompleted}
          onChange={(e) => setTaskData({ ...taskData, isCompleted: e.target.value })}
        />
        <button onClick={handleCreateTask}>タスクを作成</button>
      </div>
      
        {/* <ul>
        {taskData.map(taskData =>(
          <li key={taskData.id}>{taskData.name}</li>
        ))}
      </ul> */}
        {/* <ul>
        {response.map((task) => {
      return <li key={task.id}>{task.name}</li>;
      })}
      </ul> */}

    {/* <div>
      <h2>Task Name:</h2>
        {response.length > 0 && (
      <div>
        <ul>
          {response.map(task => (
            <li key={task.id}>{task.name}</li>
          ))}
        </ul>
      </div>
      )}
    </div>  */}
    {/* <div>
      {response && <div>Task Name:{JSON.stringify(response)}</div>}
    </div>*/}
    <TaskList response={response} />
    </div>
  );
};

export default App;
