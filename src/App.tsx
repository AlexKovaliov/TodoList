import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "active"},
    ])

    // let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)

    let [tasks, setTasks] = useState<TasksStateType>({
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
        // достаём нужный массив по todolistId
        let todoListTasks = tasks[todoListID];
        // перезапишем в этом объекте массив для нужного тудулиста отфильтрованным массивом
        tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId);
        // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        setTasks({...tasks});
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListID: string) {
        // достаём нужный массив по todolistId
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        let todoListTasks = tasks[todoListID];
        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    function addTask(newTaskName: string, todoListId: string) {
        let newTask = {id: v1(), title: newTaskName, isDone: false};
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = [newTask, ...todoListTasks]; // ... - это спред оператор
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

    function addTodoList(title: string) {
        let newTodoListID = v1();
        let newTodoList: TodoListType = {
            id: newTodoListID,
            title: title,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
    }

    function changeTodoListTitle(todoListID: string, newTitle: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">

            <AppBar position="static">

                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        To do list
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed>

                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={3}>{todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id];
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                    }

                    return (
                        <Grid item>
                            <Paper style={{padding: "20px"}} elevation={5}>
                                <TodoList
                                    title={tl.title}
                                    key={tl.id}
                                    id={tl.id}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeTodoListFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })
                }</Grid>
            </Container>
        </div>
    );
}

export default App;