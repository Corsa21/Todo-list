import './TaskItem.scss';

function TaskItem({tasks,task, setTasks}) {
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

  return (
    <div className='TaskItem' key={task.id}>
        <p className={task.completed ? 'TaskItem__task TaskItem__task_completed' : 'TaskItem__task'}>{task.text}</p>
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