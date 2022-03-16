import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {RootState} from './store';
import {IPost} from "../Type/PostType";

interface IUser {
    _id: string,
    email: string,
    password: string,
    isActivated: boolean,
    activationLink: string,
    __v: number
}

export interface IUserAuthState {
    email: string
    id: string
    isActivated: boolean
}


export interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    user: IUserAuthState | null
}

interface ISendRegistration {
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
            // const token = (getState() as RootState).auth.token
            const token = localStorage.getItem('token')
            const refreshToken = localStorage.getItem('refreshToken')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                headers.set('refreshToken', `${refreshToken}`)
            }
            return headers
        },
    }),
    tagTypes: ['Registration', 'Users', 'Login', 'Posts'],
    endpoints: (build) => ({
        getAllUsers: build.query<IUser[], void>({
            query: () => ({
                url: '/users',
            }),
        }),
        getAllPosts: build.query<IPost[], void>({
            query: () => ({
                url: '/posts',
            }),
        }),
        checkAuth: build.query<AuthState, void>({
            query: () => ({
                url: '/refresh',
                params: {withCredentials: true},
            }),
        }),
        login: build.mutation<AuthState, ISendRegistration>({
            query: (params) => ({
                url: '/login',
                method: 'POST',
                body: params,
                params: {withCredentials: true}
            }),
            invalidatesTags: ['Login']
        }),
        logout: build.mutation<void, void>({
            query: (params) => ({
                url: '/logout',
                method: 'POST',
                body: params,
                params: {withCredentials: true}
            }),
            invalidatesTags: ['Login']
        }),

        registration: build.mutation<AuthState, ISendRegistration>({
            query: (params) => ({
                url: '/registration',
                method: 'POST',
                body: params,
                params: {withCredentials: true}
            }),
            invalidatesTags: ['Registration']
        })
    })
})

export const {useRegistrationMutation, useGetAllUsersQuery, useLoginMutation, useCheckAuthQuery, useLogoutMutation, useGetAllPostsQuery} = authApi