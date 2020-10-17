import React from 'react';
import {Task} from "../Task";
import {action} from "@storybook/addon-actions";


export default {
    title: 'TodoLists/Task',
    component: Task,
}

let removeTask = action('clicked removeTask')
let changeTaskTitle = action('clicked changeTaskTitle')
let changeTaskStatus = action('clicked changeTaskStatus')

export const TasksExample = (props: any) => {
    return (
        <div>
            <Task
                task={{id: "1", title: "CSS", isDone: false}}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}
                todoListId={"todoListId1"}
            />
            <Task
                task={{id: "2", title: "JS", isDone: true}}
                removeTask={removeTask}
                changeTaskTitle={changeTaskTitle}
                changeTaskStatus={changeTaskStatus}
                todoListId={"todoListId2"}
            />
        </div>
    )
}