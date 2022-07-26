import React from 'react';

interface IHeaderData {
    title: string
}

interface IAppTable {
    headerData: IHeaderData[]
}

export const AppTable = () => {
    return (
        <div>
            <table>
                <thead></thead>
            </table>
        </div>
    );
};
