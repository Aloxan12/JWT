import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState, RoleType} from "../../authApi";
import {RoleTypes} from "../../../router/AppRoute";

interface IUser {
    email: string,
    id: string,
    isActivated: boolean
    role: RoleType
    avatar: string
}

type AuthInitialStateType = {
    user: IUser | null,
    authData: AuthState
    isAuth: boolean
}

const authInitialState: AuthInitialStateType = {
    user: {
        email: '',
        id: '',
        isActivated: false,
        role: RoleTypes.USER,
        avatar: ''
    },
    authData: {
        accessToken: null,
        refreshToken: null,
        user: null
    },
    isAuth: false,
}

const authReducer = createSlice({
    name: 'auth',
    initialState: authInitialState as AuthInitialStateType,
    reducers: {
        setAuthData: (
            state,
            {payload: AuthState}: PayloadAction<AuthState>,
        ) => {
            state.authData = AuthState
            if (AuthState.accessToken !== null && AuthState.refreshToken !== null && AuthState.user) {
                localStorage.setItem('token', AuthState.accessToken)
                localStorage.setItem('refreshToken', AuthState.refreshToken)
                state.isAuth = true
                state.user = AuthState.user
            }
        },
        setIsAuth: (state,
                   {payload: isAuth}: PayloadAction<boolean>,) => {
          state.isAuth= isAuth
        },
        logout: (state) => {
            state.isAuth = false
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        },
    },
})

export const {setAuthData, logout, setIsAuth} =
    authReducer.actions

export default authReducer.reducer