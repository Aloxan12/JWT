import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState, IUserAuthState} from "../../authApi";

interface IUser {
    email: string,
    id: string,
    isActivated: boolean
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
        isActivated: false
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
        logout: (state) => {
            state.isAuth = false
            state.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
        },
    },
})

export const {setAuthData, logout} =
    authReducer.actions

export default authReducer.reducer