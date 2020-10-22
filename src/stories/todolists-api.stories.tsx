import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
            .then((response) => setState(response.data)
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let title = "AXIOS"
        todolistAPI.createTodolist(title)
            .then((response) => setState(response.data.data)
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        let todolistId = '25756a34-88f8-48fa-af56-34ba67f18aee'
        todolistAPI.deleteTodolist(todolistId)
            .then((response) => setState(response.data)
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'f3516cd6-c845-4384-9134-71f260c4b89a'
        let title = "New"
        todolistAPI.updateTodolistTitle(todolistId, title)
            .then((response) => setState(response.data)
            )
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
