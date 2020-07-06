import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "CSS", isDone: false},
        {id: 4, title: "Rest API", isDone: false},
        {id: 5, title: "GraphQL", isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskId: number) {
        let filteredTasks = tasks.filter((t) => t.id !== taskId)
        setTasks(filteredTasks);
    }

    function changeFilter(newFilterValue: FilterValuesType) {
        setFilter(newFilterValue);
    }

    let tasksForTodoList = tasks;
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }
    return (
        <div className="App">
            <TodoList
                title="What to learn"
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;