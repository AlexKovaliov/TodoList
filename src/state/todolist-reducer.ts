import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todoListId: string
}

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

type ActionTypes =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistReducer = (state: Array<TodoListType>, action: ActionTypes) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...state, {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }]
        case 'CHANGE-TODOLIST-TITLE':
            /*const todolist = state.find(tl => tl.id === action.id)
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state];*/ //выполняет тоже самое как и код снизу
            return state.map(todo => todo.id === action.id ? {...todo, title: action.title} : todo)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(todo => todo.id === action.id ? {...todo, filter: action.filter} : todo)
        default:
            throw new Error("Man it's bad! I don't understand this type")
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: "REMOVE-TODOLIST", id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: "ADD-TODOLIST", title: title, todoListId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TODOLIST-TITLE", id: todolistId, title: title}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-TODOLIST-FILTER", id: todolistId, filter: filter}
}

