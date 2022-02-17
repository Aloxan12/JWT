import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5555/'}),
    endpoints: (build)=> ({
    registration: build.mutation({
        query: (body)=>({
            url:'registration',
            method:'POST',
            body
        })
    })
    })
})

export const { useRegistrationMutation } = authApi