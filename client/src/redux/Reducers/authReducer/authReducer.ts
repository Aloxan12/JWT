import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthState} from "../../authApi";

interface IUser{
    email: string,
    id: string,
    isActivated: boolean
}

type AuthInitialStateType = {
    user: IUser,
    authData: AuthState | null
    isAuth: boolean
    token: string | null
}

const authInitialState: AuthInitialStateType = {
    user: {
        email: '',
        id: '',
        isActivated: false
    },
    authData: null,
    isAuth: false,
    token: null
}

const authReducer = createSlice({
    name: 'auth',
    initialState: authInitialState as AuthInitialStateType,
    reducers: {
        setAuthData: (
            state,
            { payload:  AuthState  }: PayloadAction<AuthState>,
        ) => {
            state.authData = AuthState
                if(AuthState.accessToken !== null && AuthState.refreshToken !== null){
                    state.token = AuthState.accessToken
                    localStorage.setItem('token', AuthState.accessToken)
                    localStorage.setItem('refreshToken', AuthState.refreshToken)
                    state.isAuth = true
                }
        },
        setToken: (
            state,
            { payload: { token } }: PayloadAction<{ token: string | null }>,
        ) => {
            state.token = token
        },
        deleteCredentials: (state) => {
            state.isAuth = false
            state.token = null
            localStorage.removeItem('token')
        },
        setActiveAuthPage: (
            state,
            {
                payload: { activePage },
            }: PayloadAction<{ activePage: boolean }>,
        ) => {
            state.user.isActivated = activePage
        },
    },
})

export const { setAuthData, setToken, deleteCredentials, setActiveAuthPage } =
    authReducer.actions

export default authReducer.reducer