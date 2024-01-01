import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/core/redux/store';
import { logout } from '../../../app/core/redux/Reducers/auth/authSlice';
import { useLogoutMutation } from '../../../app/core/api/authApi';
import { AppLoader } from '../../../Common/Components/AppLoader/AppLoader';

const Logout = () => {
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();
  useEffect(() => {
    logoutMutation()
      .unwrap()
      .then(() => {
        dispatch(logout());
      });
  }, []);
  return <AppLoader />;
};
export default Logout;
