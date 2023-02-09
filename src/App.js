import './App.css';
import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import ListItem from './components/ListItem';
import TodoTitle from './components/TodoTitle';
import axios from 'axios';

function App() {
  const [todoText, setTodoText] = useState('');
  const [allTodos, setAllTodos] = useState([]);
  const [count, setCount] = useState(0);

  /** 새로운 할 일을 추가할 때 작동시킬 함수 */
  const addTodo = (e) => {
    e.preventDefault();

    const todoItem = {
      id: new Date().getTime(),
      text: todoText,
      isChecked: false,
      isEdit: false,
    };

    if (todoText !== '') {
      axios.post('http://localhost:3001/todos', todoItem);
      setTodoText('');
    }
  };

  /** 체크박스 토글기능 */
  const toggleChecked = async (id) => {
    const current = await axios
      .get(`http://localhost:3001/todos/${id}`)
      .then((resp) => resp.data.isChecked);
    axios.patch(`http://localhost:3001/todos/${id}`, { isChecked: !current });
  };

  /** todo 아이템 삭제 */
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3001/todos/${id}`);
  };

  const toggleEdit = async (id) => {
    const current = await axios
      .get(`http://localhost:3001/todos/${id}`)
      .then((resp) => resp.data.isEdit);
    axios.patch(`http://localhost:3001/todos/${id}`, { isEdit: !current });
  };

  const onEditTodo = (e, id) => {
    const { value } = e.target;
    axios.patch(`http://localhost:3001/todos/${id}`, { text: value });
  };

  const getServerItem = () => {
    axios
      .get('http://localhost:3001/todos')
      .then((resp) => setAllTodos(resp.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setCount(allTodos.length - allTodos.filter((todo) => todo.isChecked).length);
    getServerItem();
  }, [allTodos]);

  return (
    <main className="App">
      <TodoTitle count={count} />
      <div className="App_todo">
        <form className="App_input_wrapper" onSubmit={(e) => addTodo(e)}>
          <input
            type="text"
            className="App_input"
            value={todoText}
            placeholder="Create a new todo..."
            onChange={(e) => setTodoText(e.target.value)}
          />
          <div className="App_input_button" onClick={(e) => addTodo(e)}>
            <IoMdAdd size={24} />
          </div>
        </form>
        <div className="App_todo_list">
          {allTodos.map((todo) => (
            <ListItem
              key={todo.id}
              todo={todo}
              toggleChecked={toggleChecked}
              deleteTodo={deleteTodo}
              toggleEdit={toggleEdit}
              onEditTodo={onEditTodo}
            />
          ))}
          {allTodos.length === 0 && <p className="empty">There are no todos</p>}
        </div>
      </div>
    </main>
  );
}

export default App;
