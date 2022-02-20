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
}

interface ISendRegistration {
    email: string
    password: string
}

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5555/api'}),
    endpoints: (build) => ({
        registration: build.mutation<IRegistration, ISendRegistration>({
            query: (params) => ({
                url: '/registration',
                method: 'POST',
                body: params
            })
        })
    })
})

export const {useRegistrationMutation} = authApi