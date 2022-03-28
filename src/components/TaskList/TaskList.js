import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.scss';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const [inputValue, setInputValue] = useState('');

    const [search, setSearch] = useState('');

    const [filtredTasks, setFiltredTasks] = useState(tasks);

    const [activeBtn, setActiveBtn] = useState('');

    const [activeTasks, setActiveTasks] = useState([]);

    const [doneTasks, setDoneTasks] = useState([]);

    useEffect(() => {
        const value = search

        if (value.trim()) {
            const filtredResult = tasks.filter((task) => {
                return task.text.match(value)
            })
            setFiltredTasks(filtredResult)
        } else {
            setFiltredTasks(tasks)
        }

    }, [tasks, search])

    useEffect(() => {
        setActiveTasks([...tasks.filter((task) => {
            return !task.completed
        })])

        setDoneTasks([...tasks.filter((task) => {
            return task.completed
        })])
    }, [tasks])

    const addTask = () => {
        if (inputValue) {
            const newItem = {
                id: uuidv4(),
                text: inputValue,
                completed: false
            }
            setTasks([...tasks, newItem])
        }
    };

    const changeHandler = (e) => {
        setInputValue(e.target.value)
    }

    const searchAllHandler = () => {
        setActiveBtn('btnAll')
        setFiltredTasks(tasks)
    }

    const searchActiveHandler = () => {
        setActiveBtn('btnActive')
        const activeTasks = tasks.filter((task) => {
            return !task.completed
        })
        setFiltredTasks(activeTasks)
    }

    const searchDoneHandler = () => {
        setActiveBtn('btnDone')
        const doneTasks = tasks.filter((task) => {
            return task.completed
        })
        setFiltredTasks(doneTasks)
    }

    return (
        <div className='TaskList'>
            <header className='TaskList__header'>
                <h1>Todo list</h1>
                <p >{activeTasks.length} need to be done, {doneTasks.length} done</p>
            </header>
            <div className='TaskList__container'>
                <input onChange={(e) => { setSearch(e.target.value) }} value={search} className='TaskList__search' type="search" placeholder="Search" />
                <button onClick={searchAllHandler} className={activeBtn === 'btnAll' ? 'TaskList__btn TaskList__allButton TaskList__allButton_active' : 'TaskList__btn TaskList__allButton'}>All</button>
                <button onClick={searchActiveHandler} className={activeBtn === 'btnActive' ? 'TaskList__btn TaskList__activeButton TaskList__activeButton_active' : 'TaskList__btn TaskList__activeButton'}>Active</button>
                <button onClick={searchDoneHandler} className={activeBtn === 'btnDone' ? 'TaskList__btn TaskList__doneButton TaskList__doneButton_active' : 'TaskList__btn TaskList__doneButton'}>Done</button>
            </div>
            {filtredTasks.map((task) => {
                return (
                    <TaskItem key={task.id} task={task} tasks={tasks} setTasks={setTasks}/>
                );
            })}
            <div className='TaskList__container'>
                <input value={inputValue} onKeyDown={(e) => { if (e.code === 'Enter') addTask() }} onChange={changeHandler} className='TaskList__inputAddItem' placeholder='Write a task' />
                <button onClick={addTask} className='TaskList__addItem'>Add item</button>
            </div>
        </div>
    );
}

export default TaskList;