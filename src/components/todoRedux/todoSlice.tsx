import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
  }

type TodoState = Todo[];

const initialState: TodoState = [];

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			const newTodo: Todo = {
				id: Date.now(),
				text: action.payload,
				completed: false,
			};
			state.push(newTodo);
		},
		// toggleComplete: (state, action: PayloadAction<number>) => {
		// 		const todo = state.find((todo: any) => 
		// 				todo.id === action.payload)
		// 		if(todo) {
		// 				todo.completed = !todo.completed
		// 		}
		// },
		deleteTodo: (state, action: PayloadAction<number>) => {
			const index = state.findIndex((i: any) => 
				i.id === action.payload)
			if(index !== -1) {
				state.splice(index, 1)
			}
		},
},
});

export const {addTodo, deleteTodo} = todoSlice.actions;
export default todoSlice.reducer;