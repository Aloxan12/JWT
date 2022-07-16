import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";

function createPages(
    pages: (number | string)[],
    pagesCount: number,
    currentPage: number,
) {
    if (pagesCount > 4) {
        if (currentPage > 3) {
            pages.push(1, '...')
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                pages.push(i)
                if (i === pagesCount) break
            }
            if (currentPage + 2 === pagesCount) {
                pages.push(pagesCount)
            }
            if (currentPage + 2 < pagesCount) {
                pages.push('...', pagesCount)
            }
        } else {
            for (let i = 1; i <= 4; i++) {
                pages.push(i)
                if (i === pagesCount) break
            }
            pages.push('...', pagesCount)
        }
    } else {
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }
}

const isPaginationResetReg = /(limit=\d+&offset=\d+)/g

interface IAppPagination {
    totalCount: number
    limit: number
    setLimit?: (limit: number) => void
}

const AppPagination = ({totalCount, setLimit, limit}:IAppPagination) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const page = searchParams.get('page')
    const [currentPage, setCurrentPage] = useState<number>(!!page ? Number(page) : 1)

    const searchParamsWithoutPagination = searchParams
        .toString()
        .replace(isPaginationResetReg, '')

    useEffect(() => {
        setCurrentPage(1)
    }, [limit, searchParamsWithoutPagination])

    const pageCount = Math.ceil(totalCount / limit)
    const pages: (number | string)[] = []

    createPages(pages, pageCount, currentPage)


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