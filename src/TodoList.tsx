import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (newFilterValue: FilterValuesType) => void
    addTask: (newTaskName: string) => void
}

export function TodoList(props: PropsType) {
    let [taskName, setTaskName] = useState("");
    let addTask = () => {
        props.addTask(taskName);
            setTaskName("");
    }

    function onTaskNameChanged(e: ChangeEvent<HTMLInputElement>) {
        setTaskName(e.currentTarget.value)
    }

    function onAddTaskKeyPressed(e: KeyboardEvent<HTMLInputElement>) {
        if(e.key === "Enter"){addTask()}
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

    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input
                    type="text"
                    value={taskName}
                    onChange={onTaskNameChanged}
                    onKeyPress = {onAddTaskKeyPressed}
                />

                <button onClick={addTask}>Add</button>
            </div>

            <ul>
                {props.tasks.map((t) => {
                    let removeTask = () => {props.removeTask(t.id)};
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={removeTask}>Done</button>
                        </li>
                    )
                })}
            </ul>

            <div>
                <button onClick={onAllClickHeanler}>All</button>
                <button onClick={onActiveClickHeanler}>Active</button>
                <button onClick={onACompletedlickHeanler}>Completed</button>
            </div>

        </div>
    )
}