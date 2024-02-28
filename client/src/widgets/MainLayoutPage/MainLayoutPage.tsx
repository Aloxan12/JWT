import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import cls from './MainLayoutPage.module.scss';

export const MainLayoutPage = () => {
  return (
    <>
      <Header />
      <main className={cls.mainContainer}>
        <Outlet />
      </main>
    </>
  );
};
