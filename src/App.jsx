import TaskList from './components/TaskList.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.jsx';

const kBaseUrl = 'http://127.0.0.1:5000';

const taskApiToJson = task => {
  const { description, id, is_complete: isComplete, title } = task;
  return { description, id, isComplete, title };
};

const getTasksAsync = () => {
  return axios.get(`${kBaseUrl}/tasks`)
    .then(response => {
      return response.data.map(taskApiToJson);
    })
    .catch(err => {
      console.log(err);
      throw new Error('error fetching tasks');
    });
};

const updateTaskAsync = (id, markComplete) => {
  const endpoint = markComplete ? 'mark_complete' : 'mark_incomplete';
  return axios.patch(`${kBaseUrl}/tasks/${id}/${endpoint}`)
    .then(response => {
      return taskApiToJson(response.data.task);
    })
    .catch(err => {
      console.log(err);
      throw new Error(`error updating task ${id}`);
    });
};

const deleteTaskAsync = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`)
    .catch(err => {
      console.log(err);
      throw new Error(`error deleting task ${id}`);
    });
};


const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    refreshTasks();
  }, []);


  const refreshTasks = () => {
    return getTasksAsync()
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch(err => {
        console.log(err.message);
      });
  };


  const updateTask = id => {
    const task = tasks.find(task => task.id === id);

    if (!task) { return Promise.resolve(); }

    return updateTaskAsync(id, !task.isComplete)
      .then(newTask => {
        setTasks(oldTasks => {
          return oldTasks.map(task => {
            if (task.id === newTask.id) {
              return newTask;
            } else {
              return task;
            }
          });
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const deleteTask = id => {
    return deleteTaskAsync(id)
      .then(() => {
        setTasks(oldTasks => {
          return oldTasks.filter(task => task.id !== id);
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const handleSubmit = (data) => {
    axios.post(`${kBaseUrl}/tasks`, data)
      .then((result) => {
        console.log('Response from server:', result.data);
        setTasks((prevTasks) => [taskApiToJson(result.data.task), ...prevTasks]);
      }).catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={tasks}
            onComplete={updateTask}
            onDelete={deleteTask}
          />
        </div>
      </main>
      <NewTaskForm handleSubmit={handleSubmit} />
    </div>
  );
};

export default App;
