import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';
import { Button } from "@mui/material";
import "./Search.css"

function Search({ hideButtons = false }) {
    return (
        <form className="search">
            <div className="search_input">
                <SearchIcon className='search_inputIcon' />
                <input
                    value=""
                />
                <MicIcon />
            </div>
            {
                !hideButtons ? (
                    <div className="search_buttons">
                        <Button
                            onClick={(e) => { }}
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