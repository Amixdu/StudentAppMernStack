import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'

export default function PaginationComponent({ totalPages, updatePageNumber, pageNumber }) {
    const [data, setData] = useState()

    const fillItems = () => {
        let items = [];
        for (let number = 0; number < totalPages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === pageNumber} onClick={()=>updatePageNumber(number)}>
                {number + 1}
                </Pagination.Item>,
            );
        }
        setData(items)
    }
    
    useEffect(() => {
        fillItems()
    }, [pageNumber])

    return (
        <div className='justify-content-center d-flex'>
            <Pagination>{data}</Pagination>
        </div>
    )
}