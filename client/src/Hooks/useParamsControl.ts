
interface UseParamsControlTypeBase<T, TKey extends keyof T>  {
    paramsList:TKey[]
}

interface UseParamsControlTypeWithoutPagination<T, TKey extends keyof T> extends UseParamsControlTypeBase<T, TKey>{
    withPagination: false
    resetPagination?: never
}
interface UseParamsControlTypeWithPagination<T, TKey extends keyof T> extends UseParamsControlTypeBase<T, TKey>{
    withPagination: true
    resetPagination?: boolean
}
type UseParamsControlType<T, TKey extends keyof T> =
    UseParamsControlTypeWithoutPagination<T, TKey>
    | UseParamsControlTypeWithPagination<T, TKey>

export const useParamsControl = <T, TKey extends keyof T>({paramsList, withPagination}: UseParamsControlType<T, TKey>) => {
    return {} as T
};

