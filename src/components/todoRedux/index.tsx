import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import { RootState } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, deleteTodo } from './todoSlice';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

  
const TodoList: React.FC = () => {
    const [text, setText] = useState('');
    const todos = useSelector((state: RootState) => state.todos)
    const dispatch = useDispatch();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    };

    const handleAddTodo = () => {
        if(text.trim()) {
            dispatch(addTodo(text))
            setText("")
        }
    };

      const handleDeleteTodo = (id: number) => {
        dispatch(deleteTodo(id));
      };

  return (
    <div>
        <input type="text" value={text} onChange={handleInputChange} />{" "}
        <button onClick={handleAddTodo}> Add Todo </button>{" "}
        <ul style={{display: "flex", flexDirection: 'column', rowGap: '10px'}}>
            {todos.map((todo: Todo) => (
                <li key={todo.id} style={{ 
                    listStyleType: 'none', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    columnGap: '60px' 
                  }}
                >
                {todo.text}
                <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default TodoList;