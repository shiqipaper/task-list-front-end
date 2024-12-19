import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ handleSubmit }) => {
  const kDefaultFormState = {
    title: '',
    description: '',
    isComplete: false
  };

  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    const newFormData = {...formData, [fieldName] : fieldValue};
    setFormData(newFormData);
  };

  const onHandleSubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <form onSubmit={onHandleSubmit}>

      <div>
        <label htmlFor="taskName">Task: </label>
        <input type="text" id="taskName" name="title" value={formData.title} onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="description">Description: </label>
        <input type="text" id="description" name="description" value={formData.description} onChange={handleChange}/>
      </div>

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
