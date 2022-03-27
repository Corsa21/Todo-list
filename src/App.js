import { useEffect, useState } from 'react';
import './App.css';
import TaskListAddItemForm from './components/TaskListAddItemForm/TaskListAddItemForm';
import TaskListItem from './components/TaskList/TaskList';

function App() {
  const [todos, setTodos] = useState([]);

  const [activeTask, setActiveTasks] = useState('')

  const [doneTask, setDoneTasks] = useState('')

  const removeTask = (id) => {
    setTodos([
      ...todos.filter((todo) => {
        return todo.id !== id
      })])
  };

  const addTask = (userInput) => {
    if (userInput) {
      const newItem = {
        task: userInput,
        id: Math.random().toString(36).substr(2, 9),
        complete: false
      }
      setTodos([...todos, newItem])
    }
  };

  useEffect(()=> {
    setActiveTasks(todos.filter((todo)=>{
      return !todo.complete
    }))

    setDoneTasks(todos.filter((todo)=>{
      return todo.complete
    }))
  },[todos])

  const toggleTask = (id) => {
    setTodos([...todos.map((todo)=>{
      return id === todo.id ? {...todo, complete: !todo.complete} : {...todo}
    })])
  }




  return (
    <div className="App">
      <TaskListItem todos={todos} removeTask={removeTask} toggleTask={toggleTask} activeTask={activeTask} doneTask={doneTask}/>
      <TaskListAddItemForm
        addTask={addTask} />

    </div>
  );
}

export default App;
