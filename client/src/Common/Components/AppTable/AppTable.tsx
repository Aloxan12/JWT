import React, {useState} from 'react';

interface IHeaderData {
    title: string
    sort?: string
    colWidth?: string // px or %
}

type IAppTable<T> = {
    data: T
    headerData: IHeaderData[]
}

export const AppTable = <T, TKey>({headerData}:IAppTable<T>) => {
    const [tableData, setTableData] = useState([])
    return (
        <div>
            <table>
                <colgroup>
                    {headerData.map((th, index)=>{
                        return <col width={th.colWidth} key={`table-colgroup-${index}`} />
                    })}
                </colgroup>
                <thead>
                    {headerData.map((th, index)=>{
                        return <div key={`th-table-${index}`}>
                            {th.title}
                        </div>
                    })}
                </thead>
                <tbody>
                {tableData.map((item, index)=>{
                    return(
                        <tr key={`table-row-${index}`}>
                            {}
                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    );
};
