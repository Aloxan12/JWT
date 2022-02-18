import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5555/api'}),
    endpoints: (build)=> ({
    registration: build.mutation<any, any>({
        query: (params)=>({
            url:'/registration',
            method:'POST',
            body: params
        })
    })
    })
})

export const { useRegistrationMutation } = authApi