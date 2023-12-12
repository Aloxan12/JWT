import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../../api/authApi';
import { RoleTypes } from '../../../router/AppRouter';
import { IUser } from '../../../api/dto/UserDto';

type AuthInitialStateType = {
  user: IUser | null;
  authData: AuthState;
  isAuth: boolean;
  isInit: boolean;
};

const authInitialState: AuthInitialStateType = {
  user: {
    email: '',
    id: '',
    isActivated: false,
    role: RoleTypes.USER,
    avatar: '',
    status: '',
  },
  authData: {
    accessToken: null,
    refreshToken: null,
    user: null,
  },
  isAuth: false,
  isInit: false,
};

const authReducer = createSlice({
  name: 'auth',
  initialState: authInitialState as AuthInitialStateType,
  reducers: {
    setAuthData: (state, { payload: AuthState }: PayloadAction<AuthState>) => {
      state.authData = AuthState;
      if (AuthState.accessToken !== null && AuthState.refreshToken !== null && AuthState.user) {
        localStorage.setItem('token', AuthState.accessToken);
        localStorage.setItem('refreshToken', AuthState.refreshToken);
        state.isAuth = true;
        state.user = AuthState.user;
      }
    },
    setIsAuth: (state, { payload: isAuth }: PayloadAction<boolean>) => {
      state.isAuth = isAuth;
    },
    setUser: (state, { payload: user }: PayloadAction<IUser | null>) => {
      state.user = user;
    },
    setIsInit: (state) => {
      state.isInit = true;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { setAuthData, logout, setIsAuth, setUser, setIsInit } = authReducer.actions;

export default authReducer.reducer;
