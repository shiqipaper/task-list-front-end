import { useState } from 'react';

const NewTaskForm = () => {
  const [task, setTask] = useState('');

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  return (
    <form>
      <label htmlFor="taskName">Task: </label>
      <input type="text" id="taskName" name="task" value={task}/>
      <div>
        <input type="submit" value="Add a task" onChange={handleTaskChange}/>
      </div>
    </form>
  );
};

export default NewTaskForm;
