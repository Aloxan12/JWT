import { isRejectedWithValue, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { ToastWrapper, ToastWrapperType } from '../../Common/Components/ToastWrapper/ToastWrapper';
import { logout } from '../Reducers/authReducer/authReducer';

export const rtkErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log('action.payload', action.payload);
    if (action.payload.status === 401) {
      history.pushState('', '', 'login');
      api.dispatch(logout());
    }
    ToastWrapper({
      msg: JSON.stringify(
        !!action.payload.data ? action.payload.data.message : action.payload
      ).replace(/"/g, ''),
      type: ToastWrapperType.error,
    });
  }

  return next(action);
};
