import { useState } from 'react';
import './TaskListAddItemForm.scss';

function TaskListAddItemForm({addTask}) {

    const [userInput, setUserInput] = useState('')

    const changeHandler = (e) => {
        setUserInput(e.target.value)
    };

    const submitHandler = (e) => {
        e.preventDefault();
        addTask(userInput);
    }
  
  return (
    <form onSubmit={submitHandler} className='TaskListAddItemForm'>
        <input onChange={changeHandler} type="text" className='TaskListAddItemForm__addTaskInput' placeholder='Write a task'/>
        <button className='TaskListAddItemForm__addTaskBtn'>Add item</button>
    </form>
  );
}

export default TaskListAddItemForm;