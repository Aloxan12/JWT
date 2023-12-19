import { authApi } from '../api/authApi';
import { combineReducers } from 'redux';
import { authReducer } from './Reducers/auth/authSlice';
import { SystemReducer } from './Reducers/system/systemSlice';

export const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
  system: SystemReducer,
});
