import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolist-reducer";


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string,
    taskId: string,
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string,
    newTaskName: string,
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    isDone: boolean,
    taskId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    title: string,
    taskId: string
}

type ActionTypes = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    let todoListTasks
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId];
            copyState[action.todolistId] = todoListTasks.filter(t => t.id !== action.taskId);
            return copyState
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.newTaskName, isDone: false};
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId];
            todoListTasks = [newTask, ...todoListTasks];
            return {...copyState, [action.todolistId]: todoListTasks}
        }
        case 'CHANGE-TASK-STATUS': {
            /*let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]
                .map(task => {
                    if (task.id !== action.taskId) {
                        return task
                    } else {
                        return {...task, isDone: action.isDone}
                    }
                });*/
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => {
                        if (task.id !== action.taskId) {
                            return task
                        } else {
                            return {...task, isDone: action.isDone}
                        }
                    })
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(task => {
                        if (task.id !== action.taskId) {
                            return task
                        } else {
                            return {...task, title: action.title}
                        }
                    })
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state, [action.todoListId]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState [action.id]
            return copyState
        }
        default:
            throw new Error("Man it's bad! I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId: todolistId}
}
export const addTaskAC = (newTaskName: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", todolistId: todolistId, newTaskName: newTaskName}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string)
    : ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", todolistId, taskId, isDone}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string)
    : ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", todolistId, taskId, title}
}
