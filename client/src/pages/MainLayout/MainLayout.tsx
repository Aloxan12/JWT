import React from 'react';
import { Outlet } from 'react-router-dom';
import '../../styles/container.scss';

export const MainLayout = () => {
  return (
    <div className="container">
      <Outlet />
    </div>
  );
};
