import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from '../LandingPage/LandingPage'
import Login from '../Auth/Auth'
import Admin from '../Admin/Admin'

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
            </Routes>
        </Router>
    )
}

export default AppRoutes