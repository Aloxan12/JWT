import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RoleTypes } from '../router/AppRouter';
import { LoginResponse } from './dto/BaseDto';
import { RootState } from '../redux/store';

interface ISendRegistration {
  email: string;
  password: string;
  role: RoleTypes;
}
interface ISendLogin {
  email: string;
  password: string;
}
const local = 'http://localhost:5000/';
const vercel = 'https://node-js-lyart.vercel.app/';
export const host = location.href.includes('localhost') ? local : vercel;
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: host,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.token;
      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users', 'Posts'],
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, ISendLogin>({
      query: (params) => ({
        url: '/login',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
    }),
    refreshToken: build.query<LoginResponse, null | void>({
      query: () => ({
        method: 'GET',
        url: '/refresh',
      }),
      providesTags: ['Users'],
    }),
    logout: build.mutation<void, void>({
      query: (params) => ({
        url: '/logout',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
    }),
    registration: build.mutation<LoginResponse, ISendRegistration>({
      query: (params) => ({
        url: '/registration',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useRegistrationMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
} = authApi;
