import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

import "../styles/Todo.css";
function Todo() {

    const [todoList, setTodoList] = useState([]);
    const [text, setText] = useState('');
    const [completed, setCompleted] = useState([]);
    const [mounted, setMounted] = useState(false)
    const inputRef = useRef(null)

    if (!mounted) {
        const listToDo = localStorage.getItem('todoList')
        const listCompleted = localStorage.getItem('completed')

        if (listToDo !== null && listToDo.length > 0)
            setTodoList(listToDo.split(','))
        if (listCompleted != null && listCompleted.length > 0)
            setCompleted(listCompleted.split(','))

        setMounted(true)
    }


    useEffect(() => {
        localStorage.setItem('todoList', todoList)
    }, [todoList])

    useEffect(() => {
        localStorage.setItem('completed', completed)
    }, [completed])

    const onKeyDownPress = (event) => {

        if (event.keyCode === 13 && text != '') {
            setTodoList(item => [...item, text])
            setText('')
            inputRef.current.value = ''
        }
    }

    const onChangeHandler = (event) => {
        setText(event.target.value)
    }

    const removerHandler = (index) => {
        setCompleted([todoList[index], ...completed])
        setTodoList(item => item.filter((val, key) => key != index))
    }

    const onResetHandler = () => {
        setTodoList([])
        setText('')
        inputRef.current.value = ''
        setCompleted([])
        localStorage.removeItem('todoList')
        localStorage.removeItem('completed')
    }

    return (
        <div className='app-conatiner'>
            <div className='subcontainer-wrap'>
                <div className='todo-conatiner'>
                    <h2>To Do</h2>
                    <div className='add-todo'>
                        <input type="text" placeholder="topic" onKeyDown={onKeyDownPress} onChange={onChangeHandler} ref={inputRef}></input>
                    </div>
                    <div className='todolist-container'>
                        {todoList?.map((item, index) => {
                            return <div className='item' key={index} onClick={() => removerHandler(index)} >{item}</div>
                        })}
                    </div>
                </div>
                <div className='complete-conatiner todo-conatiner'>
                    <h2>Task Done</h2>
                    <div className='completelist-container'>
                        {completed?.map((item, index) => {
                            return <div className='complete-item item' key={index}>{item}</div>
                        })}
                    </div>
                </div>
                <button name='Reset' className='reset-btn' onClick={onResetHandler} >Reset</button>
            </div>
        </div >
    )
}

export default Todo