import { authApi } from './authApi';
import { IChatDto, IChatRequestDto, IChatsResponseDto, ICreateChat } from './dto/ChatDto';

export const chatApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAllChats: build.query<IChatsResponseDto, IChatRequestDto | void | null>({
      query: (params) => ({
        url: '/chats',
        params: !!params ? params : {},
      }),
      providesTags: ['Chat', 'Users'],
    }),
    createChat: build.mutation<IChatDto, ICreateChat>({
      query: (params) => ({
        url: '/posts',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetAllChatsQuery, useCreateChatMutation } = chatApi;
