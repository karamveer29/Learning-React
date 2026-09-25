import React from "react";
const TodoItem = () => {
    return (
    <li className="todo-item">
        <span>
            <input type="checkbox"/>
            <span className="todo-item-text">Eat</span>
        </span>
        <p>...</p>
    </li>
    );
};
export default TodoItem;
