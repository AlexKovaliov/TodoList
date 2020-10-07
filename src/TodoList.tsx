import React, {useCallback} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TodoListType} from "./AppWithRedux";
import {Task} from "./Task";


type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (newTaskName: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    changeTodoListTitle: (todoListID: string, newTitle: string) => void
}

export const TodoList = React.memo(function TodoList(props: PropsType) {

    let todo = useSelector<AppRootStateType, TodoListType | undefined>(
        state => state.todoLists.find(todo => {
            return todo && todo.id === props.id
        }))

    const onAllClickHandler = useCallback(() => {
        props.changeTodoListFilter("all", props.id);
    }, [props.changeTodoListFilter, props.id])

    const onActiveClickHandler = useCallback(() => {
        props.changeTodoListFilter("active", props.id);
    }, [props.changeTodoListFilter, props.id])

    const onCompletedClickHandler = useCallback(() => {
        props.changeTodoListFilter("completed", props.id);
    }, [props.changeTodoListFilter, props.id])

    const onClickRemoveTodoList = useCallback(() => {
        props.removeTodoList(props.id);
    }, [props.removeTodoList, props.id])

    // функция по добавлению task
    let addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle)
    }, [props.changeTodoListTitle, props.id])

    let classForAllBtn = props.filter === "all" ? "active" : "";

    //const tasksForTodoList = props.tasks
    let tasksForTodoList = props.tasks;

    if (props.filter === "active") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForTodoList = props.tasks.filter(t => t.isDone === true)
    }


    return (
        <div>
            <h3><EditableSpan title={todo ? todo.title : ''} saveNewTitle={changeTodoListTitle}/>
                <IconButton onClick={onClickRemoveTodoList}>
                    <Delete fontSize="small"/>
                </IconButton>
                {/*<button style={{cursor: "pointer"}} onClick={onClickRemoveTodoList}>Delete</button>*/}
            </h3>

            <AddItemForm addItem={addTask}/>

            {/*<div>
                <input
                    type="text"
                    value={taskName}
                    onChange={onTaskNameChanged}
                    onKeyPress={onAddTaskKeyPressed}
                    className={error ? "error" : ""} //тернарный оператор
                />
                <button style={{cursor: "pointer"}} onClick={addTask}>Add</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>*/}

            <div>
                {
                    props.tasks.map((t) => <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todoListId={props.id}
                        key={t.id}
                    />)
                }
            </div>

            <div>
                {/*<button style={{cursor: "pointer"}}
                        className={props.filter === "all" ? "active" : ""}
                        onClick={onAllClickHandler}>All
                </button>
                <button style={{cursor: "pointer"}}
                        className={props.filter === "active" ? "active" : ""}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button style={{cursor: "pointer"}}
                        className={props.filter === "completed" ? "active" : ""}
                        onClick={onCompletedClickHandler}>Completed
                </button>*/}
                <Button
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    color={props.filter === "all" ? "primary" : "default"}
                    onClick={onAllClickHandler}>All
                </Button>

                <Button
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    color={props.filter === "active" ? "primary" : "default"}
                    onClick={onActiveClickHandler}>Active
                </Button>

                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    color={props.filter === "completed" ? "primary" : "default"}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>

        </div>
    )
})

