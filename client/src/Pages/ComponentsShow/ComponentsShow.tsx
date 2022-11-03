import React, { useState } from 'react';
import { AppButton } from '../../Common/Components/AppButton/AppButton';
import { AppTrash } from '../../Common/Components/AppTrash/AppTrash';
import styles from './ComponentsShow.module.css';
import { AppInput } from '../../Common/Components/AppInput/AppInput';
import { AppRating } from '../../Common/Components/AppRating/AppRating';
import { AppInputFilter } from '../../Common/Components/AppInputFilter';
import { AppDropdown } from '../../Common/Components/AppDropdown/AppDropdown';
import { useGetAllUsersQuery } from '../../redux/api/usersApi';
import { IUser } from '../../redux/api/dto/UserDto';
import { Calendar } from '../../Common/Components/Calendar/Calendar';
import { AppTable } from '../../Common/Components/AppTable/AppTable';

export const ComponentsShow = () => {
  const { data: users } = useGetAllUsersQuery({});

  const [rating, setRating] = useState(0);
  const [dropdownData, setDropdownData] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  return (
    <div className={styles.ComponentsShowWrapper}>
      <AppButton onClick={(e) => console.log(e.currentTarget)} />
      <AppTrash size={'small'} deleteHandler={() => console.log('что-то удалил')} />
      <AppTrash size={'medium'} deleteHandler={() => console.log('что-то удалил')} />
      <AppTrash size={'big'} deleteHandler={() => console.log('что-то удалил')} />
      <AppInput
        value={''}
        onChange={(e) => console.log(e)}
        label={'label'}
        error={'error error errorerror error errorerror  error errorerror '}
      />
      <AppInputFilter searchParam={'search'} />
      <AppRating value={rating} onChange={(value) => setRating(value)} />
      <AppDropdown
        value={dropdownData}
        data={[`string`]}
        onChange={(value) => setDropdownData(value)}
        resetValueHandler={() => setDropdownData(null)}
      />

      <AppDropdown
        value={userData}
        data={!!users ? users.results : ([] as IUser[])}
        propToShowInList={'email'}
        propToShowInInput={'email'}
        onChange={(value) => setUserData(value)}
        resetValueHandler={() => setUserData(null)}
      />
      <div>
        <Calendar />
      </div>
      <AppTable data={{ count: 0, results: [] }} tableDataSelectors={[]} headerData={[]} />
    </div>
  );
};
