import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
};

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "CSS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskId: string) {
        let filteredTasks = tasks.filter((t) => t.id !== taskId)
        setTasks(filteredTasks);
    }

    function addTask(newTaskName: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: false}
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
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
                addTask={addTask}
            />
        </div>
    );
}

export default App;