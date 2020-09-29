import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


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

function AppWithRedux() {

    let todoListID1 = v1();
    let todoListID2 = v1();

    let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    let dispatch = useDispatch()

    function removeTask(taskId: string, todoListId: string) {
        const action = removeTaskAC(taskId, todoListId)
        dispatch(action);
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId));
    }

    function addTask(newTaskName: string, todoListId: string) {
        dispatch(addTaskAC(newTaskName, todoListId));
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatch(ChangeTodolistFilterAC(todoListId, value))
    }

    function removeTodoList(todoListId: string) {
        const action = RemoveTodolistAC(todoListId)
        dispatch(action);
    }

    function addTodoList(title: string) {
        dispatch(AddTodolistAC(title))
    }

    function changeTodoListTitle(todoListId: string, newTitle: string) {
        dispatch(ChangeTodolistTitleAC(todoListId, newTitle))
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
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                    }

                    return (
                        <Grid item>
                            <Paper style={{padding: "20px"}} elevation={5}>
                                <TodoList
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
    )
}

export default AppWithRedux;