import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {
  NumberOfAccounts,
  CreditHistory,
  Utilization,
  MissedPayments,
  HardInquiries,
  DerogatoryMarks,
  Home
} from './pages'
import { Header, Footer } from './Components'
import './dashboard.css'
import './App.css'

const App = () => (
  <Router>
    <div className="page">
      <div className="page-main">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/history" component={CreditHistory} />
        <Route exact path="/accounts" component={NumberOfAccounts} />
        <Route exact path="/utilization" component={Utilization} />
        <Route exact path="/missed-payments" component={MissedPayments} />
        <Route exact path="/hard-inquiries" component={HardInquiries} />
        <Route exact path="/marks" component={DerogatoryMarks} />
        <Footer />
      </div>
    </div>
  </Router>
)

export default App
