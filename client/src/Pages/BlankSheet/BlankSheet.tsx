import React, { useState } from 'react';
import styles from './BlankSheet.module.css';
import { AppTrash } from '../../Common/Components/AppTrash/AppTrash';
import { AppTable } from '../../Common/AppTableFotobox/AppTable';

export const tableHeaderMock = [
  { title: 'Текст', colWidth: '33%', sort: { asc: '-text', desc: 'text' } },
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

export const BlankSheet = () => {
  const [input, setInput] = useState('');

  const changeHandler = (value: string) => {
    setInput(value);
  };

  return (
    <div className={styles.BlankSheetWrap}>
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
  );
};
