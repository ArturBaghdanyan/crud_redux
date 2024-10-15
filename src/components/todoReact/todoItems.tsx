import React, { FC } from 'react'
import { ICard } from "../../type/todo";

interface TodoItemsProps {
    todos: ICard[];
    setTodos: React.Dispatch<React.SetStateAction<ICard[]>>;
  }

const TodoItems:FC<TodoItemsProps> = ({ todos, setTodos }) => {

    const handleDelete = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
      };

  return (
    <div>
        {todos.map(item => (
            <div key={item.id}>
                <span>{item.title}</span>
                <button
                    className="w-6 h-6 border"
                    onClick={() => handleDelete(item.id)}
                >
                    x
            </button>
            </div>
            
        ))}
    </div>
  )
}

export default TodoItems;