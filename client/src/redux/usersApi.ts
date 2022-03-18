import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from './store';


export interface IUserAuthState {
    email: string
    id: string
    isActivated: boolean
}

export interface IUserApiData {
    _id: string,
    email: string,
    password: string,
    isActivated: boolean,
    activationLink: string,
    __v: number
}


export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5555/api',
        prepareHeaders: (headers, {getState}) => {
            const accessToken = localStorage.getItem('token')
            const refreshToken = localStorage.getItem('refreshToken')
            if (accessToken || refreshToken) {
                headers.set('authorization', `Bearer ${accessToken}`)
                headers.set('refreshToken', `${refreshToken}`)
            }
            return headers
        },
    }),
    tagTypes: ['Users'],
    endpoints: (build) => ({
        getAllUsers: build.query<IUserApiData[], void>({
            query: () => ({
                url: '/users',
            }),
        }),
    })
})

export const {useGetAllUsersQuery} = usersApi