import React from 'react';
import './App.css';
// import TodoList from './components/todoRedux';
import TodoList from './components/todoReact';
import ProccessUrl from './components/apiRedux';

function App() {
  return (
    <div className="App">
      {/* <TodoList /> */}
      <TodoList />
      <ProccessUrl />
    </div>
  );
}

export default App;
