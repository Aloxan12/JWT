import {authApi} from "./authApi";
import {IUser} from "./Reducers/authReducer/authReducer";

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
        getAllUsers: build.query<IUser[], void>({
            query: () => ({
                url: '/users/',
            }),
            providesTags:['Users']
        }),
        getUserDetail: build.query<IUser, {id: string}>({
            query: ({id}) => ({
                url: `/user/${id}`,
            }),
            providesTags:['Users']
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



export const {useGetAllUsersQuery, useUploadUserAvatarMutation, useGetUserDetailQuery} = usersApi