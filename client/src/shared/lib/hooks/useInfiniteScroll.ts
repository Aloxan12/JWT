import React, { useCallback, useEffect, useState } from 'react';
import { useOnScreen } from './useOnScreen';
import { BaseQueryDto } from '../../../app/core/api/dto/BaseDto';

interface UseInfiniteScrollProps {
  getter: () => any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface IData<T> extends BaseQueryDto {
  results: T[] | [];
}

export const useInfiniteScroll = ({ getter, setPage }: UseInfiniteScrollProps) => {
  const [currentData, setCurrentData] = useState();
  const { data, isLoading } = getter();
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
};
