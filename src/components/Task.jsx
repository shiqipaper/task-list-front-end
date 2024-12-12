
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onComplete, onDelete }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : 'tasks__item__toggle';

  const onCompleteClick = () => {
    onComplete(id);
  };

  const onDeleteClick = () => {
    onDelete(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={buttonClass}
        onClick={onCompleteClick}
      >
        {title}
      </button>
      <button 
        className="tasks__item__remove button"
        onClick={onDeleteClick}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Task;
