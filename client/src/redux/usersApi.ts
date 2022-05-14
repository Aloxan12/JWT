import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from './store';
import {RoleTypes} from "../router/AppRoute";
import {RoleType} from "./authApi";


export interface IUserDataDto {
    email: string
    id: string
    isActivated: boolean
    role: RoleType
}

export interface IUserApiData {
    id: string,
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
        getAllUsers: build.query<IUserDataDto[], void>({
            query: () => ({
                url: '/users',
            }),
        }),
        uploadUserAvatar: build.query<IUserDataDto, {id: string, avatar: File}>({
            query: ({id, avatar}) => ({
                url: `/user/${id}/uploadAvatar`,
                body: {avatar: avatar}
            }),
        }),
    })
})

export const {useGetAllUsersQuery} = usersApi