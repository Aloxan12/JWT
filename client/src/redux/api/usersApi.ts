import {authApi} from "./authApi";
import {IUser, IUsersRequestDto} from "./dto/UserDto";



export const usersApi = authApi.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query<IUser[], IUsersRequestDto | void | null>({
            query: (params) => ({
                url: '/users/',
                params: !!params ? params : {}
            }),
            providesTags:['Users']
        }),
        getUserDetail: build.query<IUser, {id: string}>({
            query: ({id}) => ({
                url: `/user/${id}`,
            }),
            providesTags:['Users']
        }),
        updateUserDetail: build.mutation<IUser, {id: string, data: IUser}>({
            query: ({id, data}) => ({
                method: 'PATCH',
                url: `/user/${id}`,
                body: data
            }),
            invalidatesTags:['Users']
        }),
        uploadUserAvatar: build.mutation< IUser | unknown | void ,  {id: string, img: File}>({
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



export const {useGetAllUsersQuery, useUploadUserAvatarMutation, useGetUserDetailQuery, useUpdateUserDetailMutation} = usersApi