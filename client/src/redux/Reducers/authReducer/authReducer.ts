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
        setAuth: (
            state,
            { payload: { isAuth } }: PayloadAction<{ isAuth: boolean }>,
        ) => {
            state.isAuth = isAuth
        },
        setToken: (
            state,
            { payload: { token } }: PayloadAction<{ token: null }>,
        ) => {
            state.token = token
            if(token !== null){
                setAuth({isAuth: true})
            }
        },
        setAuthData: (
            state,
            { payload: { authData } },
        ) => {
            state.authData = authData
            if(authData !== null){
                setAuth({isAuth: true})
                setToken({token: authData.accessToken})
            }
        },
        setUser: (
            state,
            { payload: { user } }: PayloadAction<{ user: IUser }>,
        ) => {
            state.user = user
        },
        deleteCredentials: (state) => {
            state.isAuth = false
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

export const { setAuth, setUser,setToken, setAuthData, deleteCredentials, setActiveAuthPage } =
    authReducer.actions

export default authReducer.reducer