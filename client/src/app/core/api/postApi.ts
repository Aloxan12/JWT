import { ICreatePost, IPost, IPostRequestDto, IPostsResponseDto } from './dto/PostDto';
import { authApi } from './authApi';

export const postApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPosts: build.query<IPostsResponseDto, IPostRequestDto | void | null>({
      query: (params) => ({
        url: '/posts',
        params: !!params ? params : {},
      }),
      providesTags: ['Posts', 'Users'],
    }),
    createPosts: build.mutation<IPost, ICreatePost>({
      query: (params) => ({
        url: '/posts',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Posts'],
    }),
    likePost: build.mutation<IPost, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}/like`,
        method: 'PATCH',
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: build.mutation<{ post: IPost; message: string; status: number }, { id: string }>({
      query: ({ id }) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useCreatePostsMutation,
  useLikePostMutation,
  useDeletePostMutation,
} = postApi;
