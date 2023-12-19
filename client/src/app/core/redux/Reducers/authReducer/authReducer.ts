import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../../api/dto/UserDto';
import { LoginResponse } from '../../../api/dto/BaseDto';

type AuthInitialStateType = {
  user: IUser | null;
  token: string | null;
};

const authInitialState: AuthInitialStateType = {
  user: null,
  token: null,
};

const authReducer = createSlice({
  name: 'auth',
  initialState: authInitialState as AuthInitialStateType,
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

export const { setAuthData, logout, setUser } = authReducer.actions;

export default authReducer.reducer;
