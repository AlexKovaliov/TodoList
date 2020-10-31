import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api"

type ServerErrorType = SetAppStatusActionType
    | SetAppErrorActionType

export const handleServerError = <T>(data: ResponseType<T>, dispatch: Dispatch<ServerErrorType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC("Oops! Something went wrong!"))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (message: string, dispatch: Dispatch<ServerErrorType>) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

