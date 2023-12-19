import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../api/dto/UserDto';
import { REHYDRATE } from 'redux-persist/es/constants';
import { LoginResponse } from '../../../api/dto/BaseDto';

type AuthInitialStateType = {
  user: IUser | null;
  token: string | null;
  rehydrated: boolean;
};

const authInitialState: AuthInitialStateType = {
  user: null,
  token: null,
  rehydrated: false,
};

const authReducer = createSlice({
  name: 'auth',
  initialState: authInitialState as AuthInitialStateType,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<LoginResponse>) => {
      state.token = payload.accessToken;
      state.user = payload.user;
    },
    setToken: (state, { payload: token }: PayloadAction<string | null>) => {
      state.token = token;
    },
    setUser: (state, { payload: user }: PayloadAction<IUser | null>) => {
      state.user = user;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state) => {
      state.rehydrated = true;
    });
  },
});

export const { setAuthData, logout, setToken, setUser } = authReducer.actions;

export default authReducer.reducer;
