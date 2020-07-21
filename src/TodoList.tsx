import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (newTaskName: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    changeStatus: (id: string, isDone: boolean, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
}

export function TodoList(props: PropsType) {
    let [taskName, setTaskName] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    let addTask = () => {
        if (taskName.trim()) {
            props.addTask(taskName.trim(), props.id);
            setTaskName("");
        } else {
            setError("Title is required! (Write smth)")
        }
    }

    function onTaskNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setTaskName(event.currentTarget.value);
        setError(null)
    }


    function onAddTaskKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            addTask()
        } // event - обьект события
    }

    function onAllClickHeanler() {
        props.changeFilter("all", props.id);
    }

    function onActiveClickHeanler() {
        props.changeFilter("active", props.id);
    }

    function onACompletedlickHeanler() {
        props.changeFilter("completed", props.id);
    }

    function onClickRemoveTodoList() {
        props.removeTodoList(props.id);
    }

    /*let classForAllBtn = */

    return (
        <div>
            <h3>{props.title}
                <button style={{cursor: "pointer"}} onClick={onClickRemoveTodoList}>Delete</button>
            </h3>

            <div>
                <input
                    type="text"
                    value={taskName}
                    onChange={onTaskNameChanged}
                    onKeyPress={onAddTaskKeyPressed}
                    className={error ? "error" : ""} //тернарный оператор
                />
                <button style={{cursor: "pointer"}} onClick={addTask}>Add</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>

            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => {
                        props.removeTask(t.id, props.id)
                    };
                    let changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        let newCheckBoxValue = event.currentTarget.checked;
                        props.changeStatus(t.id, newCheckBoxValue, props.id)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <span>{t.title}</span>
                            <button style={{cursor: "pointer"}} onClick={removeTask}>Delete</button>
                        </li>
                    )

                })}
            </ul>

            <div>

                <button style={{cursor: "pointer"}}
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
                </button>
            </div>

        </div>
    )
}