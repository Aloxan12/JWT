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
                <thead>
                    {headerData.map((th, index)=>{
                        return <div key={`th-table-${index}`}>
                            {th.title}
                        </div>
                    })}
                </thead>
                <tbody>
                {tableData.map((item)=>{
                    return(
                        <tr>

                        </tr>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    );
};
