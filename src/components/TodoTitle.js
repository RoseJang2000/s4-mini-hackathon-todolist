import './TodoTitle.css';
import './TodoTitle.scss';

const TodoTitle = ({ count }) => {
  return (
    <div className="title_container">
      <p className="title_text">Tasks to Do : {count}</p>
    </div>
  );
};

export default TodoTitle;
