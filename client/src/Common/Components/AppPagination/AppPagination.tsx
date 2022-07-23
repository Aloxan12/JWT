import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import {isPaginationResetReg} from "../../../Hooks/useParamsControl";
import styles from './AppPagination.module.css'
import commonStyles from '../../../App.module.css'
import {AppDropdown} from "../AppDropdown/AppDropdown";

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

interface IAppPagination {
    totalCount: number
    limit: number
    setLimit?: (limit: number) => void
    sticky?: boolean
}

export const AppPagination = ({totalCount, setLimit, limit, sticky}:IAppPagination) => {
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

    useEffect(() => {
        if (currentPage === 1) {
            searchParams.set('limit', `${limit}`)
            searchParams.set('page', '1')
            setSearchParams(searchParams.toString())
        } else {
            searchParams.set('limit', `${limit}`)
            searchParams.set('page', `${currentPage}`)
            setSearchParams(searchParams.toString())
        }
    }, [currentPage, limit])

    useEffect(()=>{
        if(!!page && Number(page) !== currentPage){
            setCurrentPage(Number(page))
        }
    },[page])

    console.log('currentPage', currentPage)

    return (
        <div className={commonStyles.WidthCenter}>
            <div className={`${styles.AppPaginationWrap} ${sticky ? commonStyles.StickyBottom : ''}`}>
                {pages.map((page, index) =>{
                    return <div key={`pagination-page-${index}`}
                                className={`${styles.PaginationPage} ${currentPage === page ? styles.CurrentPage : ''}`}
                                onClick={typeof page === 'number' ? ()=> setCurrentPage(page) : undefined}
                    >
                        {page}
                    </div>
                })}
                {setLimit && <AppDropdown
                    data={[10, 20, 30]}
                    value={limit}
                    onChange={(value) => setLimit(value)}
                    paginationMode
                />}
            </div>
        </div>
    );
};