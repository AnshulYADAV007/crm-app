import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../../pages/LandingPage/LandingPage'
import Login from '../../pages/Auth/Auth'
import Admin from '../../pages/Admin/Admin'
import Client from '../../pages/Client/Client'
import Booking from '../../pages/Booking/Booking'
import MovieDetails from '../../pages/MovieDetails/MovieDetails'
import MovieTheaters from '../../pages/MovieTheatres/MovieTheatres'

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path='/'
                    element={<LandingPage />}
                />
                <Route
                    exact
                    path='/login'
                    element={<Login />}
                />
                <Route
                    exact
                    path='/admin'
                    element={<Admin />}
                />
                <Route
                    exact
                    path='/client'
                    element={<Client />}
                />
                <Route
                    exact
                    path='/movie/:movieid/:theatreid'
                    element={<Booking />}
                />
                <Route
                    exact
                    path='/movie/:movieid/details'
                    element={<MovieDetails />}
                />

                <Route
                    exact
                    path="/buytickets/:moviename/:movieid"
                    element={
                        <MovieTheaters />
                    }
                />
            </Routes>
        </Router>
    )
}

export default AppRoutes