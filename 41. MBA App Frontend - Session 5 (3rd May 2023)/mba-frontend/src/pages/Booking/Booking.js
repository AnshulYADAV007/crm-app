import "./Booking.css"
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import clsx from 'clsx'
import { getMovie } from '../../api/movie'
import { getAllTheaters, getTheaterById } from '../../api/theater'
import Navbar from '../../components/Navbar/Navbar'
import Payment from "../../components/payment/payment"

const seats = Array.from({ length: 8 * 8 }, (_, i) => i)

const Booking = () => {

    /**
     * 1. Get the movie id
     * 2. Get the theatre id
     * 3. Get the booked seats
     * 4. 
     */
    const { movieid: movieId } = useParams()
    const { theatreid: theatreId } = useParams()
    const [pageLoaded, setPageLoading] = useState(false);

    const [selectedMovieId, setSelectedMovieId] = useState(movieId);
    const [selectedTheaterId, setTheaterMovieId] = useState(theatreId);

    const [selectedMovie, setSelectedMovie] = useState({})
    const [selectedTheater, setSelectedTheater] = useState({})

    const [selectedSeats, setSelectedSeats] = useState([])
    const [occupiedSeats, setOccupiedSeats] = useState([10, 12, 50, 33, 28, 47])
    const [moviePrice, setMoviePrice] = useState(150)

    const navigate = useNavigate();

    const init = async () => {
        try {
            await getAllTheaters()
        } catch (error) {
            navigate('/login')
        }
        const response = await getMovie(selectedMovieId);
        setSelectedMovie(response.data);

        const theaterResponse = await getTheaterById(selectedTheaterId);
        setSelectedTheater(theaterResponse.data);
        console.log("theatreId", selectedTheaterId)

        setPageLoading(true)
    }
    useEffect(() => {
        console.log(localStorage.getItem('token'));
        init()
    }, [])


    const render = () => {
        return (
            <>

                <div className="App bg-black backg">

                    <h2 className="fw-bold text-light">{selectedMovie.name}</h2>
                    <ShowCase />
                    <Cinema
                        movie={selectedMovie}
                        selectedSeats={selectedSeats}
                        occupiedSeats={occupiedSeats}
                        onSelectedSeatsChange={selectedSeats => setSelectedSeats(selectedSeats)}
                    />

                    <p className="info">
                        You have selected <span className="count">{selectedSeats.length}</span>{' '}
                        seats for the price of{' '}
                        <span className="total">
                            ${selectedSeats.length * moviePrice}
                        </span>

                    </p>
                    <Payment
                        noOfSeats={selectedSeats.length}
                        movie={selectedMovie}
                        theatre={selectedTheater}
                    />
                </div>

            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="App bg-black backg">
                {
                    pageLoaded ? render() : "Loading data ..."
                }
            </div>
        </>
    )
}

function Cinema({ selectedSeats, onSelectedSeatsChange, occupiedSeats }) {
    function handleSelectedState(seat) {
        const isSelected = selectedSeats.includes(seat)
        if (isSelected) {
            onSelectedSeatsChange(
                selectedSeats.filter(selectedSeat => selectedSeat !== seat),
            )
        } else {
            onSelectedSeatsChange([...selectedSeats, seat])
        }
    }

    return (
        <div className="Cinema">
            <div className="screen" />

            <div className="seats">
                {seats.map(seat => {
                    const isSelected = selectedSeats.includes(seat)
                    const isOccupied = occupiedSeats.includes(seat)
                    return (
                        <span
                            tabIndex="0"
                            key={seat}
                            className={clsx(
                                'seat',
                                isSelected && 'selected',
                                isOccupied && 'occupied',
                            )}
                            onClick={isOccupied ? null : () => handleSelectedState(seat)}
                            onKeyPress={
                                isOccupied
                                    ? null
                                    : e => {
                                        if (e.key === 'Enter') {
                                            handleSelectedState(seat)
                                        }
                                    }
                            }
                        />
                    )
                })}
            </div>
        </div>
    )
}

function ShowCase() {
    return (
        <ul className="ShowCase">
            <li>
                <span className="seat" /> <small>Available</small>
            </li>
            <li>
                <span className="seat selected" /> <small>Selected</small>
            </li>
            <li>
                <span className="seat occupied" /> <small>Occupied</small>
            </li>
        </ul>
    )
}

export default Booking