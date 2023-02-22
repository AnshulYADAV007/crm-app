import { CSidebar, CSidebarNav, CNavTitle, CNavItem } from '@coreui/react';
import '../styles/sidebar.css'
import { Link } from 'react-router-dom';
import React from "react"
function Sidebar() {
    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    return (
        <CSidebar unfoldable className='sidebar vh-100 bg-black'>
            <CSidebarNav className='sidebar-nav'>
                <CNavTitle className='sidebar-title text-white'>
                    CRM App
                </CNavTitle>

                <CNavItem className='sidebar-item'>
                    <i className="bi bi-house text-white"></i>
                    <Link to="/admin" className='text-decoration-none text-white'>Home</Link>
                </CNavItem>

                <div onClick={logout}>
                    <CNavItem className='sidebar-item'>
                        <i className="bi bi-box-arrow-left text-white"></i>
                        <div className='text-decoration-none text-white'>Logout</div>
                    </CNavItem>
                </div>
            </CSidebarNav>
        </CSidebar>
    )
}

export default Sidebar