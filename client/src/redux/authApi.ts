import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { RootState } from './store';

interface IUser {
    _id: string,
    email: string,
    password: string,
    isActivated: boolean,
    activationLink: string,
    __v: number
}

export interface AuthState {
    accessToken: string | null
    refreshToken: string | null
    user: {
        email: string
        id: string
        isActivated: boolean
    }
}

interface ISendRegistration {
    email: string
    password: string
}
interface IError{
    error: {
        status: number
        message: string
    }
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5555/api',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers
        },}),
    tagTypes: ['Registration', 'Users', 'Login'],
    endpoints: (build) => ({
        getAllUsers: build.query<IUser[], void>({
            query: () => ({
                url: '/users',
            }),
        }),
        login: build.mutation<AuthState, ISendRegistration>({
            query: (params) => ({
                url: '/login',
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

export const { useRegistrationMutation, useGetAllUsersQuery, useLoginMutation } = authApi