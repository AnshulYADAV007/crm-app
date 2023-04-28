import { CWidgetStatsC } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import './Admin.css'
import { getAllMovies } from '../../api/movie'
import { getAllTheaters } from '../../api/theater'

const Admin = () => {
    let [theaters, setTheaters] = useState([])
    let [movies, setMovies] = useState([])

    const fetch = async () => {
        let result = await getAllMovies()
        setMovies(result.data)
        result = await getAllTheaters()
        setTheaters(result.data)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <div className='container bg-light mt-2'>
            <h3 className='text-center'>Welcome, Admin!</h3>
            <p className='text-center text-secondary'>Take a quick look at your stats below</p>
            <div className='row header'>
                <div className='col'>
                    <CWidgetStatsC
                        className='mb-3 text-danger'
                        icon={<i className='bi bi-people-fill text-danger'></i>}
                        color="dark"
                        inverse
                        progress={{ value: 80 }}
                        text="Number of Users"
                        title="Users"
                        value={80}
                    />
                </div>
                <div className='col'>
                    <CWidgetStatsC
                        className='mb-3 text-danger'
                        icon={<i className='bi bi-people-fill text-danger'></i>}
                        color="dark"
                        inverse
                        progress={{ value: 80 }}
                        text="Number of Theaters"
                        title="Theaters"
                        value={theaters.length}
                    />
                </div>
                <div className='col'>
                    <CWidgetStatsC
                        className='mb-3 text-danger'
                        icon={<i className='bi bi-people-fill text-danger'></i>}
                        color="dark"
                        inverse
                        progress={{ value: 80 }}
                        text="Number of Movies"
                        title="Movies"
                        value={movies.length}
                    />
                </div>
            </div>
            <h2>Theaters</h2>
            <table className='w-100'>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>City</th>
                </tr>
                {theaters.map(theater => {
                    return (
                        <tr>
                            <td>{theater.name}</td>
                            <td>{theater.description}</td>
                            <td>{theater.city}</td>
                        </tr>
                    )
                })}
            </table>
            <h2>Movies</h2>
            <table className='w-100'>
                <tr>
                    <th>Movie</th>
                    <th>Description</th>
                    <th>Director</th>
                </tr>
                {movies.map(movie => {
                    return (
                        <tr>
                            <td>{movie.name}</td>
                            <td>{movie.description}</td>
                            <td>{movie.director}</td>
                        </tr>
                    )
                })
                }
            </table>
        </div>
    )
}

export default Admin