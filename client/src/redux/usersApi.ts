import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {RootState} from './store';
import {RoleTypes} from "../router/AppRoute";
import {authApi, RoleType} from "./authApi";


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


export const usersApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<IUserDataDto[], void>({
            query: () => ({
                url: '/users/',
            }),
            providesTags:['Users']
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
            },
            invalidatesTags:['Users']
        }),
    })
})



export const {useGetAllUsersQuery, useUploadUserAvatarMutation} = usersApi