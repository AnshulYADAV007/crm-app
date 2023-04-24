import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import Login from '../Auth/Auth'
import Admin from '../Admin/Admin'
import Client from '../Client/Client'

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
            </Routes>
        </Router>
    )
}

export default AppRoutes