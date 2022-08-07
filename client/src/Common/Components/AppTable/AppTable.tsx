import React, {useEffect, useState} from 'react';

interface IHeaderData {
    title: string
    sort?: string
    colWidth?: string // px or %
}

interface ISelector<TKey> {
    propsNameToDisable?: TKey
}

interface ISelectorName<TKey> extends ISelector<TKey> {
    name: TKey | null
    renderItem?: never
}

interface ISelectorVoid<T> extends ISelector<keyof T> {
    name?: never
    renderItem: (item: T) => JSX.Element | string
}

type TSelector<T, TKey> = ISelectorName<TKey> | ISelectorVoid<T>

type IAppTable<T, TKey> = {
    data: T[]
    headerData: IHeaderData[]
    tableDataSelectors: TSelector<T, TKey>[]
}

export const AppTable = <T, TKey extends keyof T>({headerData, data, tableDataSelectors}: IAppTable<T, TKey>) => {
    const [tableData, setTableData] = useState<T[]>([])

    const defaultRenderItem = (item: T, name: TKey) => {
        return <div>{item[name] ? `${item[name]}` : null}</div>
    }

    useEffect(() => {
        setTableData(data)
    }, [data])

    return (
        <div>
            <table>
                <colgroup>
                    {headerData.map((th, index) => {
                        return <col width={th.colWidth} key={`table-colgroup-${index}`}/>
                    })}
                </colgroup>
                <thead>
                {headerData.map((th, index) => {
                    return <div key={`th-table-${index}`}>
                        {th.title}
                    </div>
                })}
                </thead>
                <tbody>
                {tableData.map((item, index) => {
                    return (
                        <tr key={`table-row-${index}`}>
                            {tableDataSelectors.map((
                                {
                                    propsNameToDisable,
                                    name,
                                    renderItem = (item) =>
                                        name ? defaultRenderItem(item, name!) : '?',
                                },
                                    tdIndex,
                            )=>{})}
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    );
};
