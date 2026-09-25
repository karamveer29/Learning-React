import React from "react";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import Button from "./components/Button";
import Countercomponent from "./components/Countercomponent";

import "./style.css";
const App = () => {
  return (
    <div className="todo-container">
      <Header/>
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <TodoItem />
      <Button />

    </div>
  );
};

export default App;