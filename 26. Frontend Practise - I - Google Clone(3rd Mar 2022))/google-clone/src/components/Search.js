import React from "react"
import SearchIcon from '@mui/icons-material/Search';
import MicIcon from '@mui/icons-material/Mic';

function Search() {
    return (
        <form className="search">
            <SearchIcon className='search_inputIcon' />
            <input
                value=""
            />
            <MicIcon />
        </form>
    )
}

export default Search