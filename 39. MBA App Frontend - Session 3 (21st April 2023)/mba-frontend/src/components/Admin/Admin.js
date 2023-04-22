import { CWidgetStatsC } from '@coreui/react'
import React from 'react'
import './Admin.css'

const Admin = () => {
    return (
        <div className='container bg-light mt-2'>
            <h3 className='text-center'>Welcome, Admin!</h3>
            <p className='text-center text-secondary'>Take a quick look at your stats below</p>
            <div className='row header'>
                <div className='col'>
                    <CWidgetStatsC
                        className='mb-3 text-danger'
                        icon={<i className='bi bi-people-fill text-danger'></i>}
                        color="dark"
                        inverse
                        progress={{ value: 80 }}
                        text="Number of Users"
                        title="Users"
                        value={80}
                    />
                </div>
                <div className='col'>
                    <CWidgetStatsC
                        className='mb-3 text-danger'
                        icon={<i className='bi bi-people-fill text-danger'></i>}
                        color="dark"
                        inverse
                        progress={{ value: 80 }}
                        text="Number of Theaters"
                        title="Theaters"
                        value={80}
                    />
                </div>
                <div className='col'>
                    <CWidgetStatsC
                        className='mb-3 text-danger'
                        icon={<i className='bi bi-people-fill text-danger'></i>}
                        color="dark"
                        inverse
                        progress={{ value: 80 }}
                        text="Number of Movies"
                        title="Movies"
                        value={80}
                    />
                </div>
            </div>
            {/* Table for Theatres */}
            {/* Modal for Edit Theatre */}
            {/* Table for Movies */}
            {/* Modal for Edit Movies */}
        </div>
    )
}

export default Admin