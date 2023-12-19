import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../api/dto/UserDto';
import { LoginResponse } from '../../../api/dto/BaseDto';
import { authInitialState } from './authState';

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<LoginResponse>) => {
      state.token = payload.accessToken;
      state.user = payload.user;
    },
    setUser: (state, { payload: user }: PayloadAction<IUser | null>) => {
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { reducer: authReducer } = authSlice;
export const { setAuthData, logout, setUser } = authSlice.actions;
