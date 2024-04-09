import { authApi } from './authApi';
import {
  IChatDto,
  IChatRequestDto,
  IChatsResponseDto,
  ICreateChat,
  IMessageCreate,
  IMessageDto,
  IMessageRequest,
  IMessageResponse,
} from './dto/ChatDto';

export const chatApi = authApi.injectEndpoints({
  endpoints: (build) => ({
    getAllChats: build.query<IChatsResponseDto, IChatRequestDto | void | null>({
      query: (params) => ({
        url: '/chats/',
        params: !!params ? params : {},
      }),
      providesTags: ['Chat', 'Users'],
    }),
    getMessagesList: build.query<IMessageResponse, IMessageRequest | void | null>({
      query: (params) => ({
        url: '/messages/',
        params: !!params ? params : {},
      }),
      providesTags: ['Chat', 'Users'],
    }),
    createChat: build.mutation<IChatDto, ICreateChat>({
      query: (params) => ({
        url: '/chats/',
        method: 'POST',
        body: params,
      }),
    }),
    createMessage: build.mutation<IMessageDto, IMessageCreate>({
      query: (params) => ({
        url: '/messages/',
        method: 'POST',
        body: params,
      }),
    }),
  }),
});

export const { useGetAllChatsQuery, useGetMessagesListQuery, useCreateChatMutation } = chatApi;
