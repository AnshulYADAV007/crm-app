import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api/movie'
import Navbar from '../../components/Navbar/Navbar'
import './LandingPage.css'
import { Link } from 'react-router-dom'
const LandingPage = () => {

    const [movieList, setMovieList] = useState([])
    const [pageLoading, setPageLoading] = useState(true)

    const init = async () => {
        const result = await getAllMovies()
        setMovieList(result.data)
        setPageLoading(false)
    }

    const selectedMovie = (movieName) => {
        movieList.findIndex(function (movie) {
            return movie.name.toUpperCase() === movieName.toUpperCase()
        });
    }

    useEffect(() => { init() }, [])

    return (
        !pageLoading ? (<div>
            <Navbar movies={movieList.map((movie) => movie.name)} onMovieSelect={selectedMovie} />
            <div className='container mx-5 my-2'>
                <p className='fw-bloder'>Recomended Movies</p>
                <div className='row'>
                    {
                        movieList.map((movie) => (
                            <div className="col-lg-3 col-xs-6  my-2" key={movie._id}>
                                <Link key={movie._id} to={`/movie/${movie._id}/details`}>
                                    <div className="d-flex align-items-stretch" style={{ height: 25 + 'rem' }}>
                                        <div className="card bg-dark shadow-lg" style={{ width: 14 + "rem" }}>
                                            <img src={movie.posterUrl} className="card-img-top" alt="..." style={{ height: '100%' }} />
                                            <i className="bi bi-hand-thumbs-up-fill text-success px-2 ">58k </i>
                                            <p className="text-white fw-bolder px-2">{movie.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        ))
                    }
                </div>
            </div>
        </div>
        ) : <div>Fetching Movies from backend ...</div>
    )
}

export default LandingPage