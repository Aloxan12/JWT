import React, { useEffect } from 'react';
import { useAppDispatch } from '../../../app/core/redux/store';
import { logout } from '../../../app/core/redux/Reducers/auth/authSlice';
import { useLogoutMutation } from '../../../app/core/api/authApi';

const Logout = () => {
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();
  useEffect(() => {
    logoutMutation()
      .unwrap()
      .then((res) => {
        console.log('res', res);
        dispatch(logout());
      });
  }, []);
  return <div>LogOut</div>;
};
export default Logout;
