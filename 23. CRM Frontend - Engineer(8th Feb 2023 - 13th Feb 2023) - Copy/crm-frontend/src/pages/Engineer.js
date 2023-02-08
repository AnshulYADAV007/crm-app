import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

function Engineer() {
    const [ticketUpdateModal, setTicketUpdateModal] = useState(false)
    return (
        <div className="bg-light">
            <div className="col-1"><Sidebar home='/' /></div>
            <div className="container vh-100">
                <h3 className="text-primary text-center">Welcome {localStorage.name},</h3>
                <p className="text-muted text-center">Take a quick look at your dashboard.</p>

            </div>
        </div>
    );
}

export default Engineer;