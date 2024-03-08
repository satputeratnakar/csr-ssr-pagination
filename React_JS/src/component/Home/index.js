import React, { useEffect, useState } from 'react'

const Home = () => {
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    useEffect(() => {
        if (page) {
            fetchData()
        }
    }, [page])

    const fetchData = async () => {
        const pageSize = 10;
        if (page && pageSize) {
            const r = await fetch(`http://localhost:7007/api/fetchItemList?page=${page}&pageSize=${pageSize}`)
            const d = await r.json()
            setData(d)
        }
    }

    return (
        <div>
            <ul>
                {data.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
            <div
                style={{ margin: "10px" }}
            >
                <button
                    onClick={() => {
                        setPage(+page - 1);
                        fetchData()
                    }}
                    disabled={page <= 1}
                    style={{ margin: "10px" }}
                >
                    PREV
                </button>
                <button
                    onClick={() => {
                        setPage(+page + 1);
                        fetchData()
                    }}
                    style={{ margin: "10px" }}
                >
                    NEXT
                </button>
            </div>
        </div>
    )
}

export default Home