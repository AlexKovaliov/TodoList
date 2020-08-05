import React, {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export function TodoList(props: PropsType) {
    /*let [taskName, setTaskName] = useState<string>("");
    let [error, setError] = useState<string | null>(null);*/

    /*let addTask = () => {
        if (taskName.trim()) {
            props.addTask(taskName.trim(), props.id);
            setTaskName("");
        } else {
            setError("Title is required! (Write smth)")
        }
    }*/
    /*

        function onTaskNameChanged(event: ChangeEvent<HTMLInputElement>) {
            setTaskName(event.currentTarget.value);
            setError(null)
        }
    */

    /*
        function onAddTaskKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
            if (event.key === "Enter") {
                addTask()
            } // event - обьект события
        }*/

    function onAllClickHeanler() {
        props.changeTodoListFilter("all", props.id);
    }

    function onActiveClickHeanler() {
        props.changeTodoListFilter("active", props.id);
    }

    function onACompletedlickHeanler() {
        props.changeTodoListFilter("completed", props.id);
    }

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id);
    }

    // функция по добавлению task
    function addTask(title: string) {
        props.addTask(title, props.id)
    }

    function changeTodoListTitle(newTitle: string) {
        props.changeTodoListTitle(props.id, newTitle)
    }

    let classForAllBtn = props.filter === "all" ? "active" : "";

    return (
        <div>
            <h3><EditableSpan title={props.title} saveNewTitle={changeTodoListTitle}/>
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
                {props.tasks.map((t) => {
                    let removeTask = () => {
                        props.removeTask(t.id, props.id)
                    };

                    let changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        let newCheckBoxValue = event.currentTarget.checked;
                        props.changeTaskStatus(t.id, newCheckBoxValue, props.id)
                    }

                    let changeTaskTitle = (newTitle: string) => {
                        props.changeTaskTitle(t.id, newTitle, props.id)
                    }

                    return (
                        <div key={t.id} className={t.isDone ? "is-done" : ""}>
                            <Checkbox
                                color={"primary"}
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <EditableSpan title={t.title} saveNewTitle={changeTaskTitle}/>
                            <IconButton onClick={removeTask} >
                                <Delete fontSize="small"/>
                            </IconButton>
                            {/*<span>{t.title}</span>*/}
                            {/*<button style={{cursor: "pointer"}} onClick={removeTask}>Delete</button>*/}
                        </div>
                    )
                })}
            </div>

            <div>
                {/*<button style={{cursor: "pointer"}}
                        className={props.filter === "all" ? "active" : ""}
                        onClick={onAllClickHeanler}>All
                </button>
                <button style={{cursor: "pointer"}}
                        className={props.filter === "active" ? "active" : ""}
                        onClick={onActiveClickHeanler}>Active
                </button>
                <button style={{cursor: "pointer"}}
                        className={props.filter === "completed" ? "active" : ""}
                        onClick={onACompletedlickHeanler}>Completed
                </button>*/}
                <Button
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    color={props.filter === "all" ? "primary" : "default"}
                    onClick={onAllClickHeanler}>All
                </Button>

                <Button
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    color={props.filter === "active" ? "primary" : "default"}
                    onClick={onActiveClickHeanler}>Active
                </Button>

                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    color={props.filter === "completed" ? "primary" : "default"}
                    onClick={onACompletedlickHeanler}>Completed
                </Button>
            </div>

        </div>
    )
}