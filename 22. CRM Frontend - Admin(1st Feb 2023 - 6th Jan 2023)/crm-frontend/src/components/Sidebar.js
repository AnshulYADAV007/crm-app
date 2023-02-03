import { CSidebar, CSidebarNav, CNavTitle, CNavItem } from '@coreui/react';
import CIcon from '@coreui/icons-react'
import { cilHome, cilAccountLogout } from '@coreui/icons'
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import React from "react"
function Sidebar() {
    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <CSidebar className='vh-100 bg-black'>
            <CSidebarNav>
                <CNavTitle className='text-light fw-normal'>
                    CRM App
                </CNavTitle>

                <CNavItem href='#'>
                    <CIcon customeClassName="nav-icon" icon={cilHome}></CIcon>
                    <Link to="/admin" className='text-decoration-none text-white mx-3'>Home</Link>
                </CNavItem>

                <div onClick={logout}>
                    <CNavItem href="#">
                        <CIcon customeClassName='nav-icon' icon={cilAccountLogout}></CIcon>
                        <div className='text-decoration-none text-white mx-3'>Logout</div>
                    </CNavItem>
                </div>
            </CSidebarNav>
        </CSidebar>
    )
}

export default Sidebar