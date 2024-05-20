import React, { useEffect, useState } from 'react';
import { AppDropdown, IBaseResponseDto, IWithPaginationRequestSearch } from './AppDropdown';

interface IEmptyResponse extends IBaseResponseDto {
  results: [];
}

const emptyResponse: IEmptyResponse = {
  results: [],
  next: '',
  count: 0,
  previous: '',
};

export interface IExtraOptions {
  [key: string]: string | number | boolean | undefined | number[];
}

export interface IAppDropdownWithPaginationProps<T, TKey extends keyof T> {
  value: T | null;
  multiValue?: T[] | [];
  propName?: TKey;
  propValue?: TKey;
  representFn?: (item: T | null) => string;
  onChange: (value: T) => void;
  resetValue?: () => void;
  getterData: (params: any, extraParams?: any) => any;
  extraOptions?: IExtraOptions;
  label?: string;
  required?: boolean;
  skip?: boolean;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  error?: string;
  id?: string;
}

export const AppDropdownWithPagination = <T, TKey extends keyof T>({
  getterData,
  extraOptions,
  skip,
  multiValue,
  ...otherProps
}: IAppDropdownWithPaginationProps<T, TKey>) => {
  const [params, setParams] = useState<IWithPaginationRequestSearch | null>({
    limit: 20,
    offset: 0,
    search: '',
  });
  const [inputValue, setInputValue] = useState<string>('');

  const [resetData, setResetData] = useState<boolean>(false);

  const { data, isFetching } = getterData(
    params ? { ...extraOptions, ...params } : extraOptions ? extraOptions : null,
    { skip: !!skip || !params }
  );
  const extraParamsStr = JSON.stringify(extraOptions);
  useEffect(() => {
    if (extraOptions) {
      setInputValue('');
      setParams((prevState) => ({
        ...prevState,
        limit: 20,
        offset: 0,
      }));
      if (!!data && !!data.results) {
        setResetData(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [extraParamsStr]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue === '') {
        setParams({ limit: 20, offset: 0, search: inputValue });
      } else {
        setParams({ limit: 20, offset: 0, search: inputValue });
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  return (
    <AppDropdown
      multiValue={multiValue}
      data={data ? data : emptyResponse}
      inputSearch={inputValue}
      inputSearchFn={setInputValue}
      loadMoreCallBack={(newPageParams) => {
        setParams((prev) => {
          return { ...prev, ...newPageParams };
        });
      }}
      resetData={resetData}
      setResetData={setResetData}
      isLoading={isFetching}
      {...otherProps}
    />
  );
};
