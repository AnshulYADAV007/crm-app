import { makeStyles } from '@material-ui/core'
import './App.css';
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Homepage from './Pages/HomePage';

function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh",
    },
  }))

  const classes = useStyles()

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Homepage />
            }
          />
          {/* <Route path="/coins/:id" component={CoinPage} exact /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}


export default App;
