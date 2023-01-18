import React, { useState } from 'react';
import { AppButton } from '../../Common/Components/AppButton/AppButton';
import { AppTrash } from '../../Common/Components/AppTrash/AppTrash';
import styles from './ComponentsShow.module.scss';
import { AppInput } from '../../Common/Components/AppInput/AppInput';
import { AppRating } from '../../Common/Components/AppRating/AppRating';
import { AppInputFilter } from '../../Common/Components/AppInputFilter';
import { AppDropdown } from '../../Common/Components/AppDropdown/AppDropdown';
import { useGetAllUsersQuery } from '../../redux/api/usersApi';
import { IUser } from '../../redux/api/dto/UserDto';
import { Calendar } from '../../Common/Components/Calendar/Calendar';
import { AppTable } from '../../Common/Components/AppTable/AppTable';

export const tableHeaderMock = [
  { title: 'Текст', colWidth: '33%' },
  { title: 'Числа', colWidth: '33%' },
  { title: 'Действие', colWidth: '33%' },
];

const dataMock = {
  count: 1,
  results: [
    { id: 1, text: 'text text text text text', number: 200 },
    { id: 2, text: 'text 2', number: 300 },
    { id: 3, text: 'text 3', number: 400 },
    { id: 4, text: 'text 4', number: 500 },
  ],
};

export const ComponentsShow = () => {
  const { data: users } = useGetAllUsersQuery({});

  const [rating, setRating] = useState(0);
  const [dropdownData, setDropdownData] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  return (
    <div className={styles.ComponentsShowWrapper}>
      <div className={styles.btnShowBlock}>
        <div>
          <AppButton onClick={(e) => console.log(e.currentTarget)} />
        </div>
        <div>
          <AppButton onClick={(e) => console.log(e.currentTarget)} />
        </div>
        <div>
          <AppTrash size={'small'} deleteHandler={() => console.log('что-то удалил')} />
          <AppTrash size={'medium'} deleteHandler={() => console.log('что-то удалил')} />
          <AppTrash size={'big'} deleteHandler={() => console.log('что-то удалил')} />
        </div>
      </div>
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
      <Calendar />
      <div>
        <AppTable
          data={dataMock}
          tableDataSelectors={[
            {
              renderItem: (item) => {
                return <div>{item.text}</div>;
              },
            },
            {
              renderItem: (item) => {
                return <div>{item.number}</div>;
              },
            },
            {
              renderItem: (item) => {
                return <div>удалить</div>;
              },
            },
          ]}
          headerData={tableHeaderMock}
        />
      </div>
      {/*<div>*/}
      {/*  <AppLoader />*/}
      {/*</div>*/}
    </div>
  );
};
