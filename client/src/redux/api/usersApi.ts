import { authApi } from './authApi';
import { IUser, IUsersRequestDto, IUsersResponseDto } from './dto/UserDto';

export const usersApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query<IUsersResponseDto, IUsersRequestDto | void | null>({
      query: (params) => ({
        url: '/users/',
        params: !!params ? params : {},
      }),
      providesTags: ['Users'],
    }),
    getUserDetail: build.query<IUser, { id: string }>({
      query: ({ id }) => ({
        url: `/users/${id}`,
      }),
      providesTags: ['Users'],
    }),
    updateUserDetail: build.mutation<IUser, { id: string; data: IUser }>({
      query: ({ id, data }) => ({
        method: 'PATCH',
        url: `/users/${id}`,
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
    uploadUserAvatar: build.mutation<IUser | unknown | void, { id: string; img: File }>({
      async queryFn(file, _queryApi, _extraOptions, fetchWithBQ) {
        const formData = new FormData();
        formData.append('file', file.img);
        const response = await fetchWithBQ({
          url: `/users/${file.id}/uploadAvatar`,
          method: 'PATCH',
          body: formData,
        });
        if (response.error) throw response.error;
        return response.data ? { data: response.data } : { error: response.error };
      },
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUploadUserAvatarMutation,
  useGetUserDetailQuery,
  useUpdateUserDetailMutation,
} = usersApi;
