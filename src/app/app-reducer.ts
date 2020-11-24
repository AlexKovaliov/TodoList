import {Dispatch} from "redux"
import {authAPI} from "../api/todolists-api";
import {handleServerNetworkError} from "../utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export type InitialStateType = {
    status: RequestStatusType,
    error: string | null,
    isInitialized: boolean
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        }
    }
})

export const appReducer = slice.reducer

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({isLoggedIn: true}));
            } else {
            }
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>