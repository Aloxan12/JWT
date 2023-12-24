import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';

export const MainLayoutPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
