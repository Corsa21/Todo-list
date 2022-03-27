import './TaskList.scss';
import { useEffect, useState } from 'react';

function TaskListItem({ todos, removeTask, toggleTask, doneTask, activeTask }) {

  const [search, setSearch] = useState('');

  const [filtredTodo, setFiltredTodo] = useState(todos);

  const [activeBtn, setActiveBtn] = useState('')

  useEffect(() => {
    const value = search;
    if (value.trim()) {
      const filtredResult = todos.filter((elem) => {
        return elem.task.match(value)
      })
      setFiltredTodo(filtredResult)
    } else {
      setFiltredTodo(todos)
    }

  }, [todos, search])

  const searchAllHandler = (e) => {
    setActiveBtn('btnAll')
    setFiltredTodo(todos)
  }

  const  searchActiveHandler = () => {
    setActiveBtn('btnActive')
    const activeBtns = todos.filter((todo)=>{
      return !todo.complete
    })
    setFiltredTodo(activeBtns)
  }

  const  searchDoneHandler = () => {
    setActiveBtn('btnDone')
    const doneBtns = todos.filter((todo)=>{
      return todo.complete
    })
    setFiltredTodo(doneBtns)
  }

  return (
    <>
    <header>
        <h1>Todo List</h1>
        <div>{activeTask.length} need to be done, {doneTask.length} done</div>
      </header>
      <div className='TaskListSearchForm'>
        <input onChange={(e) => { setSearch(e.target.value) }} type="text" className="TaskListSearchForm__search" placeholder='Search' />
        <button onClick={searchAllHandler}  className={activeBtn === 'btnAll' ? 'TaskListSearchForm__all TaskListSearchForm__btn TaskListSearchForm__all_active' : 'TaskListSearchForm__all TaskListSearchForm__btn'}>All</button>
        <button onClick={searchActiveHandler} className={activeBtn === 'btnActive' ? 'TaskListSearchForm__active TaskListSearchForm__btn TaskListSearchForm__active_active' : 'TaskListSearchForm__all TaskListSearchForm__btn'}>Active</button>
        <button onClick={searchDoneHandler} className={activeBtn === 'btnDone' ? 'TaskListSearchForm__done TaskListSearchForm__btn TaskListSearchForm__done_active' : 'TaskListSearchForm__done TaskListSearchForm__btn'}>Done</button>
      </div>
      {filtredTodo.map((todo) => {
        return (
          <div className='TaskList__container' key={todo.id}>
            <div className={todo.complete ? 'TaskList__text TaskList__text_completed' : 'TaskList__text'} >{todo.task}</div>
            <div className='TaskList__btns'>
              <button onClick={() => { removeTask(todo.id) }} className='TaskList__remove'><img src='/trash.png' className='TaskList__img' /></button>
              <button onClick={() => { toggleTask(todo.id) }} className='TaskList__done'><img src='/done.png' className='TaskList__img' /></button>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default TaskListItem;