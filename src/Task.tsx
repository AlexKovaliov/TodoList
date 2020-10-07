import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

type TaskPropsType = {
    task: TaskType,
    todoListId: string,
    removeTask: (taskId: string, todoListID: string) => void,
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void,
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
}
export const Task = (props: TaskPropsType) => {
    let removeTask = () => {
        props.removeTask(props.task.id, props.todoListId)
    };

    let changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        let newCheckBoxValue = event.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newCheckBoxValue, props.todoListId)
    }

    const changeTaskTitle = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todoListId)
    }, [props.changeTaskTitle, props.task.id, props.todoListId])

    return (
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                checked={props.task.isDone}
                onChange={changeStatus}
            />
            <EditableSpan title={props.task.title} saveNewTitle={changeTaskTitle}/>
            <IconButton onClick={removeTask}>
                <Delete fontSize="small"/>
            </IconButton>
        </div>
    )
}