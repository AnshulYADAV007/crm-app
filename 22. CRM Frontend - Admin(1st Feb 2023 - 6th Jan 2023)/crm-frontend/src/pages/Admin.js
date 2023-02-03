import React, { useState, useEffect } from "react"
import Sidebar from "../components/Sidebar"
import MaterialTable from "@material-table/core"
import { ExportCsv, ExportPdf } from '@material-table/exporters'
import '../styles/admin.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL

function Admin() {
    const [userList, setUserList] = useState([])
    const [userDetail, setUserDetail] = useState({})
    const [userModal, setUserModal] = useState(false)
    const [message, setMessage] = useState("")
    const showUserModal = () => setUserModal(true)
    const closeUserModal = () => {
        setUserModal(false)
        setUserDetail({})
    }
    const fetchUsers = (userId) => {
        axios.get(BASE_URL + '/crm/api/users/' + userId, {
            headers: {
                'x-access-token': localStorage.getItem("token")
            }
        }).then(function (response) {
            if (response.status === 200) {
                if (userId) {
                    setUserDetail(response.data[0])
                    showUserModal()
                } else
                    setUserList(response.data)
            }
        }).catch(function (error) {
            console.log(error)
        })
    }

    useEffect(() => {
        (async () => {
            fetchUsers("")
        })()
    }, [])

    const updateUserDetail = () => {
        const data = {
            'userType': userDetail.userType,
            'userStatus': userDetail.userStatus,
            'name': userDetail.name
        }
        axios.put(BASE_URL + '/crm/api/users/' + userDetail.userId,
            data,
            {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            }, {
            'userId': localStorage.getItem('userId')
        }).then(function (response) {
            if (response.status === 200) {
                setMessage(response.message)
                let idx = userList.findIndex((obj => obj.userId === userDetail.userId))
                userList[idx] = userDetail
                closeUserModal()
            }
        }).catch(function (error) {
            if (error.status === 400)
                setMessage(error.message)
            else
                console.log(error)
        })
    }

    const changeUserDetail = (e) => {
        if (e.target.name === 'status')
            userDetail.userStatus = e.target.value
        else if (e.target.name === 'name')
            userDetail.name = e.target.value
        else if (e.target.name === 'type')
            userDetail.userType = e.target.value
        setUserDetail(userDetail)
        setUserModal(e.target.value)
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
                                    field: "userType",
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


                        {/* Modal for editing the users */}
                        {userModal ? (
                            <Modal
                                show={userModal}
                                onHide={closeUserModal}
                                backdrop="static"
                                keyboard={false}
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Edit Details</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form onSubmit={updateUserDetail} >

                                        <div className="p-1">
                                            <h5 className="card-subtitle mb-2 text-primary lead">User ID: {userDetail.userId}</h5>
                                            <hr />
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon2">Name</span>
                                                <input type="text" className="form-control" name="name" value={userDetail.name} onChange={changeUserDetail} />

                                            </div>
                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon2">Email</span>
                                                <input type="text" className="form-control" name="email" value={userDetail.email} onChange={changeUserDetail} disabled />

                                            </div>

                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon2">Type</span>
                                                <select className="form-select" name="type" value={userDetail.userType} onChange={changeUserDetail}>
                                                    <option value="ADMIN">ADMIN</option>
                                                    <option value="CUSTOMER">CUSTOMER</option>
                                                    <option value="ENGINEER">ENGINEER</option>
                                                </select>

                                            </div>

                                            <div class="input-group mb-3">
                                                <span class="input-group-text" id="basic-addon2">Status</span>
                                                <select name="status" className="form-select"
                                                    value={userDetail.userStatus} onChange={changeUserDetail}>
                                                    <option value="APPROVED">APPROVED</option>
                                                    <option value="REJECTED">REJECTED</option>
                                                    <option value="PENDING">PENDING</option>
                                                </select>

                                            </div>

                                        </div>

                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => closeUserModal()}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => updateUserDetail()}>
                                        Update
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        ) : ("")
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;