
type UseParamsControlType<T, TKey extends keyof T> = {
    paramsList:TKey[]
    withPagination: boolean
}

export const useParamsControl = <T, TKey extends keyof T>({paramsList, withPagination}: UseParamsControlType<T, TKey>) => {
    return {} as T
};

