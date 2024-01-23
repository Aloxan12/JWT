import { ICreatePost, IPost, IPostRequestDto, IPostsResponseDto } from './dto/PostDto';
import { authApi } from './authApi';

export const postApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAllPosts: build.query<IPostsResponseDto, IPostRequestDto | void | null>({
      query: (params) => ({
        url: '/posts',
        params: !!params ? params : {},
      }),
      // serializeQueryArgs: ({ endpointName }) => {
      //   console.log('endpointName', endpointName);
      //   return endpointName;
      // },
      // merge: (currentCache, newItems) => {
      //   console.log('currentCache', currentCache);
      //   console.log('newItems', newItems);
      //   currentCache.results.push(...newItems.results);
      // },
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // },
      providesTags: (data) =>
        data
          ? [...data.results.map((post) => ({ type: 'Posts' as const, id: post.id })), 'Users']
          : ['Posts', 'Users'],
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
      invalidatesTags: (result, error, post) => [{ type: 'Posts', id: post.id }],
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
