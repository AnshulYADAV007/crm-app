import React from 'react'
import { Link } from 'react-router-dom'
import HamburgerMenu from './HamburgerMenu'

const HeaderNav = props => {
  const path = window.location.pathname.slice(1)
  return (
    <div>
      <div className="header py-4">
        <div className="container">
          <div className="d-flex">
            <Link className="header-brand" to="/">
              FICO Score
            </Link>
            <div className="d-flex order-lg-2 ml-auto">
              <div className="dropdown">
                <span className="nav-link pr-0 leading-none">
                  <span className="avatar" style={{ backgroundImage: 'url(https://alaq.io/adrien.jpg)' }} />
                  <span className="ml-2 d-none d-lg-block">
                    <span className="text-default">John Doe</span>
                  </span>
                </span>
              </div>
            </div>
            <span className="header-toggler d-lg-none ml-3 ml-lg-0">
              <HamburgerMenu />
            </span>
          </div>
        </div>
      </div>

      <div className="header collapse d-lg-flex p-0" id="headerMenuCollapse">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg order-lg-first">
              <ul className="nav nav-tabs border-0 flex-column flex-lg-row">
                <li className="nav-item">
                  <Link to="/" className={`nav-link ${path.length === 0 ? ' active' : ''}`}>
                    <i className="fe fe-home" /> Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/history" className={`nav-link ${path === 'history' ? ' active' : ''}`}>
                    <i className="fe fe-file" /> Credit History
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/accounts" className={`nav-link ${path === 'accounts' ? ' active' : ''}`}>
                    <i className="fe fe-file" /> Accounts
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/utilization" className={`nav-link ${path === 'utilization' ? ' active' : ''}`}>
                    <i className="fe fe-file" /> Credit Use
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/missed-payments" className={`nav-link ${path === 'missed-payments' ? ' active' : ''}`}>
                    <i className="fe fe-file" /> Payments
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/hard-inquiries" className={`nav-link ${path === 'hard-inquiries' ? ' active' : ''}`}>
                    <i className="fe fe-file" /> Hard Inquiries
                  </Link>
                </li>
                <li className="nav-item dropdown">
                  <Link to="/marks" className={`nav-link ${path === 'marks' ? ' active' : ''}`}>
                    <i className="fe fe-file" /> Derogatory Marks
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderNav
