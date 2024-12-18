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
      title: task,
      description: '',
      isComplete: false
    };
    handleSubmit(newTask);
    setTask('');
  };

  return (
    <form onSubmit={onHandleSubmit}>
      <label htmlFor="taskName">Task: </label>
      <input
        type="text"
        id="taskName"
        name="name"
        value={task}
        onChange={handleTaskChange}/>
      <div>
        <input type="submit" value="Add a task" />
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
export default NewTaskForm;
