import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RoleTypes } from '../../router/AppRoute';
import { IUser } from './dto/UserDto';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: IUser | null;
}

interface ISendRegistration {
  email: string;
  password: string;
  role: RoleTypes;
}
interface ISendLogin {
  email: string;
  password: string;
}
const git = 'https://aloxan12.github.io/JWT/api';
const local = 'http://localhost:5555/api';
const vercel = 'https://node-js-lyart.vercel.app/';
export const host = location.href.includes('localhost') ? vercel : vercel;
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: host,
    prepareHeaders: (headers, { getState }) => {
      // const accessToken = (getState() as RootState).auth.authData.accessToken
      // const refreshToken = (getState() as RootState).auth.authData.refreshToken
      const accessToken = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken || refreshToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
        headers.set('refreshToken', `${refreshToken}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Users', 'Posts'],
  endpoints: (build) => ({
    login: build.mutation<AuthState, ISendLogin>({
      query: (params) => ({
        url: '/login',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
    }),
    logout: build.mutation<void, void>({
      query: (params) => ({
        url: '/logout',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
    }),
    registration: build.mutation<AuthState, ISendRegistration>({
      query: (params) => ({
        url: '/registration',
        method: 'POST',
        body: params,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useRegistrationMutation, useLoginMutation, useLogoutMutation } = authApi;
