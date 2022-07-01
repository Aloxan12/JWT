import {useEffect, useState} from "react";
import {useSearchParams, URLSearchParamsInit} from "react-router-dom";

interface IResetPaginationByParamsChangedProps {
    searchParams: URLSearchParams
    setSearchParams: (
        nextInit: URLSearchParamsInit,
        navigateOptions?:
            | { replace?: boolean | undefined; state?: any }
            | undefined,
    ) => void
}

export const isPaginationResetReg = /(limit=\d+&offset=\d+)|[&]/g

export const resetPaginationByParamsChanged = ({
                                                   searchParams,
                                                   setSearchParams,
                                               }: IResetPaginationByParamsChangedProps) => {
    searchParams.delete('limit')
    searchParams.delete('offset')
    setSearchParams(searchParams.toString())
}

interface UseParamsControlTypeBase<T, TKey extends keyof T> {
    paramsList: TKey[]
}

interface UseParamsControlTypeWithoutPagination<T, TKey extends keyof T> extends UseParamsControlTypeBase<T, TKey> {
    withPagination: false
    resetPagination?: never
}

interface UseParamsControlTypeWithPagination<T, TKey extends keyof T> extends UseParamsControlTypeBase<T, TKey> {
    withPagination: true
    resetPagination?: boolean
}

type UseParamsControlType<T, TKey extends keyof T> =
    UseParamsControlTypeWithoutPagination<T, TKey>
    | UseParamsControlTypeWithPagination<T, TKey>

export const useParamsControl = <T, TKey extends keyof T>({
                                                              paramsList,
                                                              withPagination,
                                                              resetPagination
                                                          }: UseParamsControlType<T, TKey>) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const search = searchParams.toString()
    const [state, setState] = useState({})

    const fullParamsList = withPagination ? ['limit', 'offset', ...paramsList] : paramsList

    const searchParamsWithoutPagination = search.replace(isPaginationResetReg, '')

    useEffect(() => {
        if (!!resetPagination) {
            resetPaginationByParamsChanged({ searchParams, setSearchParams })
        }
    }, [searchParamsWithoutPagination])

    useEffect(()=>{},[])

    return {} as T
};

