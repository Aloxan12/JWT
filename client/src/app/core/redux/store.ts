import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { rtkErrorMiddleware } from '../middleware/error-middleware';
import authReducer from './Reducers/authReducer/authReducer';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  [authApi.reducerPath]: authApi.reducer,
  auth: authReducer,
});

const persistConfig: PersistConfig<RootState> = {
  key: 'auth',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(authApi.middleware)
        .concat(rtkErrorMiddleware),
  });
};

const store = setupStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
