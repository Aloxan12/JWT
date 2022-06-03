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
                url: '/users/',
            }),
        }),
        uploadUserAvatar: build.mutation<any,  {id: string, img: File}>({
            async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
                const formData = new FormData();
                formData.append('file', file.img);
                const response = await fetchWithBQ({
                    url: `/user/${file.id}/uploadAvatar`,
                    method: 'POST',
                    body: formData,
                });
                if (response.error) throw response.error;
                return response.data ? { data: response.data } : { error: response.error };
                //     headers: {
                //         Accept: 'application/json',
                //         'Content-Type': 'multipart/form-data',
                //     },
                //     method: 'POST',
                //     url: `/user/${id}/uploadAvatar`,
                //     body: img,
                //     params: img
                // },
            }
        }),
    })
})



export const {useGetAllUsersQuery, useUploadUserAvatarMutation} = usersApi