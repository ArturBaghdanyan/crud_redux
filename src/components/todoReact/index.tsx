import React, { useState } from 'react'
import AddColumn from "./addColumn";
import { ICard } from "../../type/todo";
import TodoItems from './todoItems';

const TodoList = () => {
    const [todos, setTodos] = useState<Array<ICard>>([])

    

  return (
    <div>
        <AddColumn onAdd={(text: string) => (
            setTodos([
                ...todos, 
                {
                    id: Date.now().toString(), 
                    title: text, 
                    isCompleted: false
                }
            ])
        )}/>
       <TodoItems todos={todos} setTodos={setTodos} />
    </div>
  )
}

export default TodoList;