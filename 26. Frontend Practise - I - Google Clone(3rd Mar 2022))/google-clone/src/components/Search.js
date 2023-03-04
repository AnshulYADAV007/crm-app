import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { Button } from "@mui/material";
import { useStateValue } from '../StateProvider/StateProvider'
import "./Search.css"
import { actionTypes } from "../StateProvider/reducer";
import { useState } from "react";

function Search({ hideButtons = false }) {
    const [{ term }, dispatch] = useStateValue()
    const [input, setInput] = useState("")

    const search = e => {
        e.preventDefault()

        dispatch({
            type: actionTypes.SET_SEARCH_TERM,
            term: input
        })
        console.log(term)
        window.location.href = '/search'
    }

    return (
        <form className="search">
            <div className="search_input">
                <SearchIcon className='search_inputIcon' />
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <MicIcon />
            </div>
            {
                !hideButtons ? (
                    <div className="search_buttons">
                        <Button
                            onClick={search}
                            type="submit"
                            variant="outlined"
                        >Google Search</Button>
                        <Button variant="outlined">I'm Feeling Lucky</Button>
                    </div>
                ) : ("")
            }
        </form>
    )
}

export default Search