import { useState } from 'react';
import './TaskItem.scss';

function TaskItem({tasks,task, setTasks}) {

    const [inputState, setInputState] = useState(false);

    const [inputValue,setInputValue] = useState('')

    const removeTask = (id) => {
       setTasks([...tasks.filter((task)=>{
           return task.id !== id
       })])
    }

    const toggleTask = (id)=> {
        setTasks([...tasks.map((task)=>{
           return task.id === id ? {...task, completed: !task.completed} : {...task}
        })])
    }

    const inputHandler = () => {
        setInputState(!inputState)
    }

    const keyDownHandler = (e,id) => {
        if(e.code === 'Enter') {
            setTasks([...tasks.map((task)=>{
                if(task.id === id) {
                    return {...task, text: inputValue}
                }
                return task
            })])
            setInputState(!inputState)
        }
    }

    const changeHandler = (e) => {
        setInputValue(e.target.value)
    }

  return (
    <div className='TaskItem' key={task.id}>
        {inputState ? <input className="TaskItem__input" value={inputValue} onChange={changeHandler} onKeyDown={(event)=>{keyDownHandler(event,task.id)}} /> : <p onClick={inputHandler} className={task.completed ? 'TaskItem__task TaskItem__task_completed' : 'TaskItem__task'}>{task.text}</p>}
        <div className='TaskItem__btns'>
            <button onClick={()=>{removeTask(task.id)}} className='TaskItem__btn'>
                <img className='TaskItem__img' src='/trash.png' alt='trash'/>
            </button>
            <button onClick={()=>{toggleTask(task.id)}} className='TaskItem__btn'>
                <img className='TaskItem__img' src='/done.png' alt='done'/>
            </button>
        </div>
    </div>
  );
}

export default TaskItem;