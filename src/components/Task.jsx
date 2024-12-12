
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({ id, title, isComplete, onComplete }) => {
  // const [complete, setComplete] = useState(isComplete);
  const buttonClass = complete ? 'tasks__item__toggle--completed' : 'tasks__item__toggle';
  
  const onCompleteClick = () => {
    onComplete(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={buttonClass}
        onClick={onCompleteClick}
      >
        {title}
      </button>
      <button className="tasks__item__remove button">x</button>
      <p>{isComplete}</p>
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
