import { useState, useEffect } from 'react'
import API_KEY from './key';
const CONTEXT_KEY = "131258f42a9d747d6";

const useGoogleSearch = (term) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}`)
                .then(response => response.json())
                .then(result => {
                    setData(result)
                })
        }

        fetchData().then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    })

    return { data }
}

export default useGoogleSearch