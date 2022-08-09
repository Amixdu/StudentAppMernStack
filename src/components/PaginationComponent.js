import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';




export default function PaginationComponent() {
    const navigate = useNavigate()
    const [data, setData] = useState()

    const fillItems = () => {
        let active = 1;
        let items = [];
        for (let number = 1; number <= 5; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} onClick={()=>navigate(`/posts?page=${number}`)}>
                {number}
                </Pagination.Item>,
            );
        }
        setData(items)
    }

    useEffect(() => {
        fillItems()
    }, [])

    return (
        <div className='justify-content-center d-flex'>
            <Pagination>{data}</Pagination>
        </div>
    )


}
