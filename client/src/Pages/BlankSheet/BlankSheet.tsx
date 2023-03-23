import React, { useRef, useState } from 'react';
import './BlankSheet.scss';
import { AppTrash } from '../../Common/Components/AppTrash/AppTrash';
import { AppTable } from '../../Common/AppTableFotobox/AppTable';
import { AppScrollWrapper } from '../../Common/AppScrollWrapper/AppScrollWrapper';
import { IUser } from '../../redux/api/dto/UserDto';
import { AppDropdown } from '../../Common/Components/AppDropdown/AppDropdown';
import { useGetAllUsersQuery } from '../../redux/api/usersApi';

export const tableHeaderMock = [
  { title: 'Текст', colWidth: '33%', sort: 'text' },
  { title: 'Числа', colWidth: '33%', sort: 'number' },
  { title: 'Действие', colWidth: '33%' },
];

const dataMock = {
  count: 1,
  results: [
    { id: 1, text: 'text text text text text', number: 200 },
    { id: 2, text: 'text 2', number: 300 },
    { id: 3, text: 'text 3', number: 400 },
    { id: 4, text: 'text 4', number: 500 },
    { id: 5, text: 'text 4', number: 500 },
    { id: 6, text: 'text 4', number: 500 },
    { id: 7, text: 'text 4', number: 500 },
    { id: 8, text: 'text 4', number: 500 },
    { id: 8, text: 'text 4', number: 500 },
    { id: 8, text: 'text 4', number: 500 },
    { id: 8, text: 'text 4', number: 500 },
    { id: 8, text: 'text 4', number: 500 },
    { id: 8, text: 'text 4', number: 900 },
  ],
};

export const BlankSheet = () => {
  const { data: users } = useGetAllUsersQuery({});
  const [userData, setUserData] = useState<IUser | null>(null);
  const [input, setInput] = useState('');

  const changeHandler = (value: string) => {
    setInput(value);
  };
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div className={'blank-sheet-wrap'}>
      <AppDropdown
        label={'Дропдаун с бэка'}
        value={userData}
        data={!!users ? users.results : ([] as IUser[])}
        propToShowInList={'email'}
        propToShowInInput={'email'}
        onChange={(value) => setUserData(value)}
        resetValueHandler={() => setUserData(null)}
      />
      {/*<AppTable*/}
      {/*  data={dataMock}*/}
      {/*  tableDataSelectors={[*/}
      {/*    {*/}
      {/*      renderItem: (item) => {*/}
      {/*        return <div>{item.text}</div>;*/}
      {/*      },*/}
      {/*    },*/}
      {/*    {*/}
      {/*      renderItem: (item) => {*/}
      {/*        return <div>{item.number}</div>;*/}
      {/*      },*/}
      {/*    },*/}
      {/*    {*/}
      {/*      renderItem: (item) => {*/}
      {/*        return (*/}
      {/*          <div>*/}
      {/*            <AppTrash*/}
      {/*              deleteHandler={() => {}}*/}
      {/*              text={'ltccndbntkmyj lfekbnm'}*/}
      {/*              size={'medium'}*/}
      {/*            />*/}
      {/*          </div>*/}
      {/*        );*/}
      {/*      },*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*  headerData={tableHeaderMock}*/}
      {/*/>*/}
    </div>
  );
};
