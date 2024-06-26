import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { AppNotification, ToastWrapperType } from '../../../entities/ToastWrapper/ToastWrapper';
import { logout } from '../redux/Reducers/auth/authSlice';

export const rtkErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log('action.payload', action.payload);
    if (action.payload.status === 401) {
      api.dispatch(logout());
    }
    AppNotification({
      msg: JSON.stringify(
        !!action.payload.data ? action.payload.data.message : action.payload
      )?.replace(/"/g, ''),
      type: ToastWrapperType.error,
    });
  }

  return next(action);
};
