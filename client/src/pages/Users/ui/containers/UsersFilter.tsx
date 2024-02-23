import React from 'react';
import { AppInputFilter } from '../../../../features/AppInputFilter/AppInputFilter';

export const UsersFilter = () => {
  return <AppInputFilter searchParam="search" placeholder="Введите email" label="Поиск по email" />;
};
