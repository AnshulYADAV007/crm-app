import React, { useState } from 'react';
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';

export const TextContext = React.createContext()

function App() {
  const [text, setText] = useState('')
  return (
    <TextContext.Provider value={{ text, setText }}>
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
    </TextContext.Provider>
  );
}

export default App;

