import React, {useCallback} from 'react';
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

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        const action = removeTaskAC(taskId, todoListId)
        dispatch(action);
    }, [dispatch])

    const addTask = useCallback((newTaskName: string, todoListId: string) => {
        dispatch(addTaskAC(newTaskName, todoListId));
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListId));
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId));
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(todoListId, value))
    }, [dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        const action = RemoveTodolistAC(todoListId)
        dispatch(action);
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodolistAC(title))
    }, [dispatch])

    const changeTodoListTitle = useCallback((todoListId: string, newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todoListId, newTitle))
    }, [dispatch])

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

                    return (
                        <Grid item>
                            <Paper style={{padding: "20px"}} elevation={5}>
                                <TodoList
                                    title={tl.title}
                                    key={tl.id}
                                    id={tl.id}
                                    filter={tl.filter}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeTodoListFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
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