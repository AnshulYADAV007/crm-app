import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route
                    exact
                    path="/login"
                    element={<Auth />}
                />
            </Routes>
        </Router>
    )
}

export default AppRoutes