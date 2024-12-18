import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ handleSubmit }) => {
  const [task, setTask] = useState('');

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title: title,
      isComplete: false
    };
    handleSubmit(newTask);
    setTask('');
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <label htmlFor="taskName">Task: </label>
      <input type="text" id="taskName" name="title" value={task}/>
      <div>
        <input type="submit" value="Add a task" onChange={handleTaskChange}/>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default NewTaskForm;
