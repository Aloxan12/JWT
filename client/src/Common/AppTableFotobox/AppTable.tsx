import React, { useEffect, useState } from 'react';
import styles from './AppTable.module.css';
import { BaseQueryDto } from '../../redux/api/dto/BaseDto';
import { AppPagination } from '../Components/AppPagination/AppPagination';
import sortArrow from '../../utils/images/arrow-down.png';

interface ISortTableParams {
  asc: string;
  desc: string;
}

interface IHeaderData {
  title: string;
  sort?: ISortTableParams;
  colWidth?: string; // px or %
}

interface ITableData<T> extends BaseQueryDto {
  results: T[] | [];
}

interface ISelector<TKey> {
  propsNameToDisable?: TKey;
}

interface ISelectorName<TKey> extends ISelector<TKey> {
  name: TKey | null;
  renderItem?: never;
}

interface ISelectorVoid<T> extends ISelector<keyof T> {
  name?: never;
  renderItem: (item: T) => JSX.Element | string;
}

type TSelector<T, TKey> = ISelectorName<TKey> | ISelectorVoid<T>;

type IAppTable<T, TKey> = {
  data: ITableData<T>;
  headerData: IHeaderData[];
  tableDataSelectors: TSelector<T, TKey>[];
};

export const AppTable = <T, TKey extends keyof T>({
  headerData,
  data,
  tableDataSelectors,
}: IAppTable<T, TKey>) => {
  const [tableData, setTableData] = useState<T[]>([]);

  const defaultRenderItem = (item: T, name: TKey) => {
    return <div>{item[name] ? `${item[name]}` : null}</div>;
  };

  useEffect(() => {
    setTableData(data.results);
  }, [data]);

  return (
    <div className={styles.AppTableWrap}>
      <table>
        <colgroup>
          {headerData.map((th, index) => {
            return <col width={th.colWidth} key={`table-colgroup-${index}`} />;
          })}
        </colgroup>
        <thead>
          <tr>
            {headerData.map((th, index) => {
              return (
                <th key={`th-table-${index}`}>
                  {th.title}
                  {!!th.sort && <img src={sortArrow} alt="sort-arrow" className={styles.SortIco} />}
                  {/*Добавить тултип для сортировки*/}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, itemIndex) => {
            return (
              <tr key={`table-row-${itemIndex}`}>
                {tableDataSelectors.map(
                  (
                    {
                      propsNameToDisable,
                      name,
                      renderItem = (item) => (name ? defaultRenderItem(item, name!) : '?'),
                    },
                    tdIndex
                  ) => {
                    return (
                      <td
                        key={`tr-${itemIndex}-td-${tdIndex}`}
                        className={
                          (item[propsNameToDisable!] as unknown) === true ? 'set-disabled' : ''
                        }
                      >
                        {renderItem(item)}
                      </td>
                    );
                  }
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {data && !!data.count && <AppPagination totalCount={data.count} limit={5} />}
    </div>
  );
};
