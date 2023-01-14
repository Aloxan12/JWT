import React from 'react';
import '../../styles/container.scss';

interface IMainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: IMainLayoutProps) => {
  return <div className="container">{children}</div>;
};
