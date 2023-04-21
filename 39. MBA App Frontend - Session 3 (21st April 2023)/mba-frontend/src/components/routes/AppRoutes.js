import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import Login from '../Auth/Auth'

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
            </Routes>
        </Router>
    )
}

export default AppRoutes