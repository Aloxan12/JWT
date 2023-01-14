import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export const isPaginationResetReg = /(limit=\d+&page=\d+)|[&]/g;

interface UseParamsControlTypeBase<T, TKey extends keyof T> {
  paramsList: (TKey | undefined)[];
}

interface UseParamsControlTypeWithoutPagination<T, TKey extends keyof T>
  extends UseParamsControlTypeBase<T, TKey> {
  withPagination: false;
  resetPagination?: never;
  limit?: never;
}

interface UseParamsControlTypeWithPagination<T, TKey extends keyof T>
  extends UseParamsControlTypeBase<T, TKey> {
  withPagination: true;
  resetPagination?: boolean;
  limit?: number;
}

type UseParamsControlType<T, TKey extends keyof T> =
  | UseParamsControlTypeWithoutPagination<T, TKey>
  | UseParamsControlTypeWithPagination<T, TKey>;

export const useParamsControl = <T, TKey extends keyof T>({
  paramsList,
  withPagination,
  resetPagination,
  limit,
}: UseParamsControlType<T, TKey>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.toString();
  const [params, setParams] = useState<null | T>(null);

  const fullParamsList: (TKey | undefined)[] = withPagination
    ? ['limit' as TKey, 'page' as TKey, ...paramsList]
    : paramsList;

  const searchParamsWithoutPagination = search.replace(isPaginationResetReg, '');

  useEffect(() => {
    if (!!resetPagination) {
      searchParams.set('limit', `${!!limit ? limit : '10'}`);
      searchParams.set('page', '1');
      setSearchParams(searchParams.toString());
    }
  }, [searchParamsWithoutPagination]);

  useEffect(() => {
    const newParams = {} as {
      [key in TKey]?: string | number | boolean;
    };
    fullParamsList.forEach((param) => {
      if (param) {
        newParams[param] = !!searchParams.get(param as string)
          ? (searchParams.get(param as string) as string)
          : undefined;
      }
    });

    const newState = Object.entries(newParams).reduce(
      (newPrams, [param, value]) =>
        value !== undefined ? { ...newPrams, [param]: value } : newPrams,
      {}
    ) as T;
    setParams(newState);
  }, [search]);

  return params as T;
};
