import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { Button } from "@mui/material";
import "./Search.css"
import { actionTypes } from "../StateProvider/reducer";
import { useState } from "react";
import { TextContext } from "../App";
import { useNavigate } from "react-router-dom";

function Search({ hideButtons = false }) {
    const { text, setText } = React.useContext(TextContext)
    const [input, setInput] = useState(text)
    const navigate = useNavigate()

    const search = e => {
        console.log("here")
        e.preventDefault()

        setText(input)

        console.log(text)
        navigate('/search')
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
                ) : (
                    <div className="search_buttons">
                        <Button
                            className="search_buttonsHidden"
                            onClick={search}
                            type="submit"
                            variant="outlined"
                        >Google Search</Button>
                        <Button
                            className="search_buttonsHidden"
                            variant="outlined"
                        >I'm Feeling Lucky</Button>
                    </div>
                )
            }
        </form>
    )
}

export default Search