import React, { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import MaterialTable from "@material-table/core"
import { ExportCsv, ExportPdf } from '@material-table/exporters'
import '../styles/admin.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

function Admin() {
    const [userList, setUserList] = useState([{
        "userId": 'a',
        'name': 'b',
        'email': 'a',
        'userTypes': "ADMIN",
        'userStatus': 'APPROVED'
    }])
    const fetchUsers = (userId) => {
        setUserList([{
            "userId": 'a',
            'name': 'b',
            'email': 'a',
            'userTypes': "ADMIN",
            'userStatus': 'APPROVED'
        }])
    }

    return (
        <div className="row bg-light">
            <div className="col-1"><Sidebar home='/' /></div>
            <div className="col my-4 vh-100">
                <div className="container">
                    <div>
                        {/*Main Admin DashBoard*/}
                        <h3 className="text-primary text-center">Welcome,</h3>
                        <p className="text-muted text-center">Take a quick look at you admin stats below.</p>

                        {/* cards */}
                        <div className="row my-5 mx-2 text-center">
                            {/* Open */}
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card  cardItem shadow  bg-primary text-dark bg-opacity-25 borders-b" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-pencil text-primary mx-2"></i>Open</h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <h1 className="col text-dark mx-4">8</h1>
                                            </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={20} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "darkblue",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* In Progress */}
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card shadow  bg-warning text-dark bg-opacity-25 borders-y" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-lightning-charge text-warning mx-2"></i>Progress </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">4</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={80} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "darkgoldenrod",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Closed */}
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card shadow  bg-success text-dark bg-opacity-25 borders-g" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-check2-circle text-success mx-2"></i>Closed </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">2</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={80} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "darkolivegreen",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Blocked */}
                            <div className="col-xs-12 col-lg-3 col-md-6 my-1">
                                <div className="card shadow  bg-secondary text-dark bg-opacity-25 borders-grey" style={{ width: 15 + 'rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-subtitle mb-2"><i class="bi bi-slash-circle text-secondary mx-2"></i>Blocked </h5>
                                        <hr />
                                        <div className="row">
                                            <div className="col">  <h1 className="col text-dark mx-4">2</h1> </div>
                                            <div className="col">
                                                <div style={{ width: 40, height: 40 }}>
                                                    <CircularProgressbar value={20} styles={buildStyles({
                                                        textColor: "red",
                                                        pathColor: "black",
                                                    })} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <hr />

                        {/* Material Table */}
                        <MaterialTable
                            onRowClick={(event, rowData) => fetchUsers(rowData.userId)}

                            data={userList}
                            columns={[
                                {
                                    title: "USER ID",
                                    field: "userId",
                                },
                                {
                                    title: "Name",
                                    field: "name",

                                },
                                {
                                    title: "EMAIL",
                                    field: "email",
                                    filtering: false
                                },
                                {
                                    title: "ROLE",
                                    field: "userTypes",
                                    lookup: {
                                        "ADMIN": "ADMIN",
                                        "CUSTOMER": "CUSTOMER",
                                        "ENGINEER": "ENGINEER",

                                    },
                                },
                                {
                                    title: "Status",
                                    field: "userStatus",
                                    lookup: {
                                        "APPROVED": "APPROVED",
                                        "PENDING": "PENDING",
                                        "REJECTED": "REJECTED",

                                    },
                                },
                            ]}
                            options={{
                                filtering: true,
                                sorting: true,
                                exportMenu: [{
                                    label: 'Export PDF',
                                    exportFunc: (cols, datas) => ExportPdf(cols, datas, 'userRecords')
                                }, {
                                    label: 'Export CSV',
                                    exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                                }],
                                headerStyle: {
                                    backgroundColor: 'darkblue',
                                    color: '#FFF'
                                },
                                rowStyle: {
                                    backgroundColor: '#EEE',
                                }
                            }}
                            title="USER RECORDS"
                        />


                        {/* Card for editing the users */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;