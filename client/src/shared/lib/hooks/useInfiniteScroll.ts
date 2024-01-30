import React, { useCallback, useEffect, useState } from 'react';
import { useOnScreen } from './useOnScreen';
import { BaseQueryDto, IWithPagination } from '../../../app/core/api/dto/BaseDto';

interface UseInfiniteScrollProps<Params extends IWithPagination> {
  getter: (params: Params) => any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface IInfiniteScrollResults<T> extends BaseQueryDto {
  results: T[] | [];
}
interface GetterResponse<T> {
  data?: IInfiniteScrollResults<T>;
  isLoading: boolean;
  isFetching: boolean;
}

interface UseInfiniteScrollResponse<T> {
  dataList: T[];
  measureRef: (node: HTMLElement | null) => void;
  isLoading: boolean;
  setCurrentData: React.Dispatch<React.SetStateAction<T[]>>;
}

export const useInfiniteScroll = <T extends { id: string }, Params extends IWithPagination>({
  getter,
  page,
  setPage,
}: UseInfiniteScrollProps<Params>): UseInfiniteScrollResponse<T> => {
  const [currentData, setCurrentData] = useState<T[]>([]);
  const { data, isLoading, isFetching } = getter({
    page,
    limit: 10,
  } as Params) as GetterResponse<T>;
  const { prevPage, nextPage, results } = data || {};

  const { measureRef, isIntersecting, observer } = useOnScreen();

  const loadMore = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  useEffect(() => {
    if (isIntersecting && nextPage) {
      loadMore();
      observer?.disconnect();
    }
  }, [isIntersecting, nextPage, loadMore]);

  useEffect(() => {
    if (results && !prevPage) setCurrentData(results);
    if (results && !!prevPage) {
      setCurrentData((prevData) => [...prevData, ...results]);
    }
  }, [results, prevPage]);

  return { dataList: currentData, measureRef, isLoading: isLoading || isFetching, setCurrentData };
};
