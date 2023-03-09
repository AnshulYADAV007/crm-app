import React from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search"
import SearchIcon from '@mui/icons-material/Search';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RoomIcon from '@mui/icons-material/Room';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "./SearchResults.css"
import useGoogleSearch from "../useGoogleSearch";
import { TextContext } from "../App";
// import data from '../response'

function SearchResults() {
    const { text, _ } = React.useContext(TextContext)

    const { data } = useGoogleSearch(text)

    return (
        <div className="searchResults">
            <div className="searchResults_header">
                <div className="searchResults_header_row1">
                    <Link to="/">
                        <img
                            className="searchResults_logo"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/368px-Google_2015_logo.svg.png"
                            alt="" />
                    </Link>
                    <Search hideButtons />
                </div>
                <div className="searchResults_headerBody">
                    <div className="searchResults_options">

                        {/*--------searchResults_optionsLeft--------------*/}
                        <div className="searchResults_optionsLeft">
                            <div className="searchResults_option">
                                <SearchIcon />
                                <Link to="/all">All</Link>
                            </div>
                            <div className="searchResults_option">
                                <DescriptionIcon />
                                <Link to="/news">News</Link>
                            </div>
                            <div className="searchResults_option">
                                <ImageIcon />
                                <Link to="/images">Images</Link>
                            </div>
                            <div className="searchResults_option">
                                <LocalOfferIcon />
                                <Link to="/shopping">Shopping</Link>
                            </div>
                            <div className="searchResults_option">
                                <RoomIcon />
                                <Link to="/maps">Maps</Link>
                            </div>
                            <div className="searchResults_option">
                                <MoreVertIcon />
                                <Link to="/more">More</Link>
                            </div>

                            <div className="searchResults_option">
                                <Link to="/settings">Settings</Link>
                            </div>
                            <div className="searchResults_option">
                                <Link to="/tools">Tools</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {text && (
                <div className="searchResults_results">
                    <p className="searchResults_resultCount" >
                        About {data?.searchInformation.formattedTotalResults} results in
                        ({data?.searchInformation.formattedSearchTime} seconds) for {text}
                    </p>
                    {data?.items.map(item => (
                        <div className="searchResults_result">
                            {/* eslint-disable-next-line react/jsx-no-target-blank */}
                            <a href={item.link} target="_blank">
                                {item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src && (
                                    <img
                                        className="searchResults_resultImage"
                                        src={item.pagemap?.cse_image?.length > 0 && item.pagemap?.cse_image[0]?.src}
                                        alt=''
                                    />
                                )}
                                {item.displayLink} ✔
                            </a>
                            {/* eslint-disable-next-line react/jsx-no-target-blank */}
                            <a className="searchResults_resultTitle" href={item.link} target="_blank">
                                <h2>{item.title}</h2>
                            </a>
                            <p className="searchResults_resultSnippet">
                                {item.snippet}
                            </p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchResults