import React, { useState } from 'react';
import { AppBtnColor, AppBtnSize, AppButton } from '../../Common/Components/AppButton/AppButton';
import { AppTrash } from '../../shared/ui/AppTrash/AppTrash';
import styles from './ComponentsShow.module.scss';
import { AppInput } from '../../Common/Components/AppInput/AppInput';
import { AppRating } from '../../Common/Components/AppRating/AppRating';
import { AppInputFilter } from '../../Common/Components/AppInputFilter';
import { AppDropdown } from '../../Common/Components/AppDropdown/AppDropdown';
import { useGetAllUsersQuery } from '../../app/core/api/usersApi';
import { IUser } from '../../app/core/api/dto/UserDto';
import { Calendar } from '../../Common/Components/Calendar/Calendar';
import { AppTable } from '../../Common/Components/AppTable/AppTable';

export const tableHeaderMock = [
  { title: 'Текст', colWidth: '33%' },
  { title: 'Числа', colWidth: '33%' },
  { title: 'Действие', colWidth: '33%' },
];

const dataMock = {
  count: 1,
  nextPage: 2,
  prevPage: 0,
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
        <div className="btn-col">
          <AppButton size={AppBtnSize.small} onClick={(e) => console.log(e.currentTarget)} />
        </div>
        <div className="btn-col">
          <AppButton onClick={(e) => console.log(e.currentTarget)} />
        </div>
        <div className="btn-col">
          <AppButton size={AppBtnSize.big} onClick={(e) => console.log(e.currentTarget)} />
        </div>
        <div className="btn-col">
          <AppButton color={AppBtnColor.red} onClick={(e) => console.log(e.currentTarget)} />
        </div>
        <div className="btn-col">
          <AppButton color={AppBtnColor.blue} onClick={(e) => console.log(e.currentTarget)} />
        </div>

        <div className="btn-col">
          <AppTrash size={'small'} deleteHandler={() => console.log('что-то удалил')} />
          <AppTrash size={'medium'} deleteHandler={() => console.log('что-то удалил')} />
          <AppTrash size={'big'} deleteHandler={() => console.log('что-то удалил')} />
        </div>
      </div>
      <div className={styles['input-show-block']}>
        <div className="input-col">
          <AppInput value={''} onChange={(e) => console.log(e)} label={'Базовый'} />
        </div>
        <div className="input-col">
          <AppInputFilter label={'Фильтр'} searchParam={'search'} />
        </div>
        <div className="input-col">
          <AppInput
            value={''}
            message="Подсказка"
            onChange={(e) => console.log(e)}
            label={'Подсказка'}
          />
        </div>
        <div className="input-col">
          <AppInput
            value={''}
            onChange={(e) => console.log(e)}
            label={'Ошибка'}
            error={'error error errorerror error errorerror  error errorerror '}
          />
        </div>
        <div className="input-col">
          <AppDropdown
            label={'Дропдаун'}
            value={dropdownData}
            data={[`string`]}
            onChange={(value) => setDropdownData(value)}
            resetValueHandler={() => setDropdownData(null)}
          />
        </div>
        <div className="input-col">
          <AppDropdown
            label={'Дропдаун с бэка'}
            value={userData}
            data={!!users ? users.results : ([] as IUser[])}
            propToShowInList={'email'}
            propToShowInInput={'email'}
            onChange={(value) => setUserData(value)}
            resetValueHandler={() => setUserData(null)}
          />
        </div>
      </div>
      <div className={styles['other-show-block']}>
        <div>
          <AppRating value={rating} onChange={(value) => setRating(value)} />
        </div>
        <div>
          <Calendar />
        </div>
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
                renderItem: () => {
                  return (
                    <div>
                      <AppTrash
                        deleteHandler={() => {}}
                        text={'ltccndbntkmyj lfekbnm'}
                        size={'medium'}
                      />
                    </div>
                  );
                },
              },
            ]}
            headerData={tableHeaderMock}
          />
        </div>
      </div>
      {/*<div>*/}
      {/*  <AppLoader />*/}
      {/*</div>*/}
    </div>
  );
};
