import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from './store';

export interface IUserAuthState {
    email: string
    id: string
    isActivated: boolean
    role: RoleType
    avatar: string
}


export interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    user: IUserAuthState | null
}

export type RoleType = 'USER' | 'ADMIN'

interface ISendRegistration {
    email: string
    password: string
    role: RoleType
}
interface ISendLogin {
    email: string
    password: string
}

interface IError {
    error: {
        status: number
        message: string
    }
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5555/api',
        prepareHeaders: (headers, {getState}) => {
            // const accessToken = (getState() as RootState).auth.authData.accessToken
            // const refreshToken = (getState() as RootState).auth.authData.refreshToken
            const accessToken = localStorage.getItem('token')
            const refreshToken = localStorage.getItem('refreshToken')
            if (accessToken || refreshToken) {
                headers.set('authorization', `Bearer ${accessToken}`)
                headers.set('refreshToken', `${refreshToken}`)
            }
            return headers
        },
    }),
    tagTypes: ['Registration', 'Users', 'Login', 'Posts'],
    endpoints: (build) => ({
        login: build.mutation<AuthState, ISendLogin>({
            query: (params) => ({
                url: '/login',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Login']
        }),
        logout: build.mutation<void, void>({
            query: (params) => ({
                url: '/logout',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Login']
        }),

        registration: build.mutation<AuthState, ISendRegistration>({
            query: (params) => ({
                url: '/registration',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Registration']
        })
    })
})

export const {useRegistrationMutation, useLoginMutation, useLogoutMutation} = authApi