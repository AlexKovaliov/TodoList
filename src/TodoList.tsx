import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    addTask: (newTaskName: string) => void
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    changeStatus: (id: string, isDone: boolean) => void
}

export function TodoList(props: PropsType) {
    let [taskName, setTaskName] = useState <string> ("");
    let [error, setError] = useState <string | null> (null);

    let addTask = () => {
        if (taskName.trim()) {
            props.addTask(taskName.trim());
            setTaskName("");
        } else {
            setError("Title is required! (Write something)")
        }
    }

    function onTaskNameChanged(event: ChangeEvent<HTMLInputElement>) {
        setTaskName(event.currentTarget.value);
        setError(null)
    }


    function onAddTaskKeyPressed(event: KeyboardEvent<HTMLInputElement>) {
        if(event.key === "Enter"){addTask()} // event - обьект события
    }

    function onAllClickHeanler() {
        props.changeFilter("all")
    }

    function onActiveClickHeanler() {
        props.changeFilter("active")
    }

    function onACompletedlickHeanler() {
        props.changeFilter("completed")
    }

    /*let classForAllBtn = */

    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input
                    type="text"
                    value={taskName}
                    onChange={onTaskNameChanged}
                    onKeyPress={onAddTaskKeyPressed}
                    className={error ? "error" : ""} //тернарный оператор
                />
                <button onClick={addTask}>Add</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>

            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => {props.removeTask(t.id)};
                    let changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
                        let newCheckBoxValue = event.currentTarget.checked;
                        props.changeStatus(t.id, newCheckBoxValue)
                    }
                    return (
                        <li key={t.id} className={ t.isDone ? "is-done" : ""}>
                            <input
                                type="checkbox"
                                checked={t.isDone}
                                onChange={changeStatus}
                            />
                            <span>{t.title}</span>
                            <button onClick={removeTask}>Delete</button>
                        </li>
                    )

                })}
            </ul>

            <div>

                <button
                    className={props.filter === "all" ? "active" : ""}
                    onClick={onAllClickHeanler}>All</button>
                <button
                    className={props.filter === "active" ? "active" : ""}
                    onClick={onActiveClickHeanler}>Active</button>
                <button
                    className={props.filter === "completed" ? "active" : ""}
                    onClick={onACompletedlickHeanler}>Completed</button>
            </div>

        </div>
    )
}