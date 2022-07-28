import React from 'react';

interface IHeaderData {
    title: string
    sort?: string
}

interface IAppTable {
    headerData: IHeaderData[]
}

export const AppTable = ({headerData}:IAppTable) => {
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
                <tbody></tbody>
            </table>
        </div>
    );
};
