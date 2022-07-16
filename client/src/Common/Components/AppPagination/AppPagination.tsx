import React, {useState} from 'react';
import {useSearchParams} from "react-router-dom";

const AppPagination = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')
    const [currentPage, setCurrentPage] = useState<number>(!!page ? Number(page) : 1)
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