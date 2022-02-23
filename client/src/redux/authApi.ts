import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

interface IRegistration {
    accessToken: string
    refreshToken: string
    user: {
        email: string
        id: string
        isActivated: boolean
    }
    error: {
        status: number
        message: string
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
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5555/api'}),
    tagTypes: ['Registration', 'Users'],
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: '/users',
            }),
        }),
        registration: build.mutation<IRegistration, ISendRegistration>({
            query: (params) => ({
                url: '/registration',
                method: 'POST',
                body: params,
            }),

            invalidatesTags: ['Registration']
        })
    })
})

export const { useRegistrationMutation, useGetAllUsersQuery } = authApi