import React, {useState} from 'react';

const AppPagination = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const pages:number[] = []
    return (
        <div>
            {pages.map((page, index) =>{
                return <div key={`pagination-page-${index}`}>
                    {page}
                </div>
            })}
        </div>
    );
};

export default AppPagination;