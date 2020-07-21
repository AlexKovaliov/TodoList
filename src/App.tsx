import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export type FilterValuesType = "all" | "active" | "completed";

type TodoListGeneralType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    /*let [tasks, setTasks] = useState<Array<TaskType>>([


    ]);*/

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListGeneralType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "active"},
    ])


    let [tasks, setTasks] = useState<TaskStateType>({
        [todoListID1]: [     //[todoListID1] используем вместо имени т.к ID всегда есть у таски
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
        ],
        [todoListID2]: [
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
            {id: v1(), title: "SaSSL", isDone: false},
        ],
    });

    /*let [filter, setFilter] = useState<FilterValuesType>("all")*/

    function removeTask(taskId: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId);
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function addTask(newTaskName: string, todoListID: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: false};
        let todoListTasks = tasks[todoListID];
        tasks[todoListID] = [newTask, ...todoListTasks]; // ... - это спред оператор
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }

    function removeTodoList(todoListID: string) {
        delete tasks[todoListID];
        setTasks({...tasks});
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID));
    }

    return (
        <div className="App">
            {todoLists.map(tl => {

                let tasksForTodoList = tasks[tl.id];
                if (tl.filter === "active") {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                }
                if (tl.filter === "completed") {
                    tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                }

                return (
                    <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                )
            })
            }
        </div>
    );
}

export default App;