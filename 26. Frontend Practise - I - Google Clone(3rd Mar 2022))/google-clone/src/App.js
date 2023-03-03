import React from 'react';
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            exact
            path="/search"
            element={
              <SearchResults />
            }
          />
          <Route
            exact
            path="/"
            element={
              <Home />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
