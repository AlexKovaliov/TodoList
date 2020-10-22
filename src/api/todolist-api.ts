import axios from 'axios'

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '40d9ad0b-5c59-493c-b1f4-22ed9e6cc14c'
    }
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodoType>>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists',
            {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType<{}>>(`todo-lists/${todolistId}`)
    },

    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType<{}>>(`todo-lists/${todolistId}`,
            {title: title})
    }
}

