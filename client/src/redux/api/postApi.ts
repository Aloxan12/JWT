import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {ICreatePost, IPost, IPostRequestDto, IPostsResponseDto} from "./dto/PostDto";


export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5555/api',
        prepareHeaders: (headers, {getState}) => {
            const token = localStorage.getItem('token')
            const refreshToken = localStorage.getItem('refreshToken')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
                headers.set('refreshToken', `${refreshToken}`)
            }
            return headers
        },
    }),
    tagTypes: ['Posts'],
    endpoints: (build) => ({
        getAllPosts: build.query<IPostsResponseDto, IPostRequestDto | void | null>({
            query: (params) => ({
                url: '/posts',
                params: !!params ? params : {},
            }),
            providesTags:['Posts']
        }),
        createPosts: build.mutation<IPost, ICreatePost>({
            query: (params) => ({
                url: '/posts',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['Posts']
        }),
        deletePost: build.mutation<{post: IPost, message: string, status: number}, {id: string}>({
            query: ({id}) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                // body: {id},
            }),
            invalidatesTags: ['Posts']
        }),
    })
})

export const { useGetAllPostsQuery, useCreatePostsMutation, useDeletePostMutation } = postApi