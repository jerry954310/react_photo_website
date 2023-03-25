import React, { useState, useEffect } from 'react'
import Search from '../components/Search'
import Picture from '../components/Picture'

const Homepage = () => {
    const [input, setInput] = useState('')
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [currentSearch, setCurrentSearch] = useState('')

    const auth = '563492ad6f917000010000013d8f09d6c4f14b48a3e5224852b8a763'
    const initialURL = 'https://api.pexels.com/v1/curated?page=1&per_page=15'
    const searchURL = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=1`

    //fetch data when a page loads on
    useEffect(() => {
        search(initialURL)
    }, [])

    //fetch data API
    const search = async (url) => {
        setPage(2)
        const dataFetch = await fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json', Authorization: auth },
        })

        let parsedData = await dataFetch.json()
        setData(parsedData.photos)
    }

    //Load more pictures
    const morepicture = async () => {
        let newURL
        if (input === '') {
            newURL = `https://api.pexels.com/v1/curated?page=${page}&per_page=15`
        } else {
            newURL = `https://api.pexels.com/v1/search?query=${input}&per_page=15&page=${page}`
        }
        setPage(page + 1)
        const dataFetch = await fetch(newURL, {
            method: 'GET',
            headers: { Accept: 'application/json', Authorization: auth },
        })

        let parsedData = await dataFetch.json()
        setData(data.concat(parsedData.photos))
    }

    return (
        <div style={{ minHeight: '100vw' }}>
            <Search
                search={() => {
                    setCurrentSearch(input)
                    search(searchURL)
                }}
                input={input}
                setInput={setInput}
            />
            <div className="pictures">
                {data &&
                    data.map((d) => {
                        return <Picture data={d} />
                    })}
            </div>

            <div className="morePicture">
                <button onClick={morepicture}>Load More</button>
            </div>
        </div>
    )
}

export default Homepage
