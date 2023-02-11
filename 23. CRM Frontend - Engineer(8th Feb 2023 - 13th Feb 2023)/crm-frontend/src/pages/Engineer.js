import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import TicketsCard from "../components/TicketsCard";
import MaterialTable from '@material-table/core'
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import fetchTickets from "../utils/fetchTickets";
import updateTicketCounts from "../utils/updateTicketCounts";
import { Button, Modal } from 'react-bootstrap'
import '../styles/engineer.css'
import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL

function Engineer() {
    const [ticketUpdateModal, setTicketUpdateModal] = useState(false)
    const [ticketStatusCount, setTicketStatusCount] = useState({
        open: 0,
        closed: 0,
        in_progress: 0,
        blocked: 0,
        total: 1
    })
    const [message, setMessage] = useState("")
    const [ticketDetails, setTicketDetails] = useState([])
    const [selectedTicket, setSelectedTicket] = useState({})

    const fetchAndUpdateTickets = async () => {
        let tickets = await fetchTickets(localStorage)
        updateTicketCounts(tickets, setTicketStatusCount)
        setTicketDetails(tickets)
    }

    useEffect(() => {
        (async () => {
            await fetchAndUpdateTickets()
        })()
    }, [])

    const closeTicketUpdationModal = () => setTicketUpdateModal(false)
    const editTicket = (ticket) => {
        const ticketCopy = { ...ticket }
        setSelectedTicket(ticketCopy)
        setTicketUpdateModal(true)
    }
    const onTicketUpdate = (e) => {
        if (e.target.name === 'title')
            selectedTicket.title = e.target.value
        else if (e.target.name === 'description')
            selectedTicket.description = e.target.value
        else if (e.target.name === "status")
            selectedTicket.status = e.target.value
        else if (e.target.name === "ticketPriority")
            selectedTicket.ticketPriority = e.target.value
        setSelectedTicket({ ...selectedTicket })
    }

    const updateTicket = (e) => {
        e.preventDefault()
        axios.put(BASE_URL + '/crm/api/tickets/' + selectedTicket.id, selectedTicket, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }, {
            'userId': localStorage.getItem("userId")
        }).then(
            (response) => {
                setMessage("Ticket Updated Successfully")
                closeTicketUpdationModal()
                fetchAndUpdateTickets()
            }
        ).catch(
            (error) => {
                if (error.status === 400)
                    setMessage(error.message)
                else if (error.status === 401)
                    setMessage("Authorization error, retry logging in")
                closeTicketUpdationModal()
                console.log(error.message)
            }
        )
    }

    return (
        <div className="bg-light">
            <div className="col-1"><Sidebar home='/' /></div>
            <div className="container vh-100">
                <div className="pt-4">
                    <h3 className="text-primary text-center">Welcome {localStorage.name},</h3>
                    <p className="text-muted text-center">Take a quick look at your dashboard.</p>
                </div>
                {/* cards */}
                <div className="row my-4 mx-2 text-center">
                    {/* Open */}
                    <TicketsCard
                        color='bg-primary'
                        icon='bi-pencil'
                        type='Open'
                        count={ticketStatusCount.open}
                        total={ticketStatusCount.total}
                        borders='borders-b' />

                    {/* In Progress */}
                    <TicketsCard
                        color='bg-warning'
                        icon='bi-lightning-charge'
                        type='In Progress'
                        count={ticketStatusCount.in_progress}
                        total={ticketStatusCount.total}
                        borders='borders-y' />

                    {/* Closed */}
                    <TicketsCard
                        color='bg-success'
                        icon='bi-check2-circle'
                        type='Closed'
                        count={ticketStatusCount.closed}
                        total={ticketStatusCount.total}
                        borders='borders-g' />

                    {/* Blocked */}
                    <TicketsCard
                        color='bg-secondary'
                        icon='bi-slash-circle'
                        type='Blocked'
                        count={ticketStatusCount.blocked}
                        total={ticketStatusCount.total}
                        borders='borders-grey' />

                </div>
                <hr />
                <p className="text-success">{message}</p>
                <MaterialTable
                    onRowClick={(event, rowData) => editTicket(rowData)}
                    data={ticketDetails}
                    title="TICKETS ASSIGNED TO YOU"
                    columns={[
                        {
                            title: "Ticket ID",
                            field: "id",
                        },
                        {
                            title: "TITLE",
                            field: "title",
                        },
                        {
                            title: "DESCRIPTIONS",
                            field: "description",
                            filtering: false
                        },
                        {
                            title: "REPORTER",
                            field: "reporter",
                        },
                        {
                            title: "PRIORITY",
                            field: "ticketPriority",
                        },
                        {
                            title: "ASSIGNEE",
                            field: "assignee",
                        },
                        {
                            title: "Status",
                            field: "status",
                            lookup: {
                                "OPEN": "OPEN",
                                "IN_PROGRESS": "IN_PROGRESS",
                                "BLOCKED": "BLOCKED",
                                "CLOSED": "CLOSED"

                            },
                        },
                    ]}
                    options={{
                        filtering: true,
                        sorting: true,
                        exportMenu: [{
                            label: 'Export PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, 'ticketRecords')
                        }, {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, 'userRecords')
                        }],
                        headerStyle: {
                            backgroundColor: 'darkblue',
                            color: '#FFF'
                        },
                        rowStyle: {
                            backgroundColor: '#EEE'
                        }
                    }}
                />
                {
                    ticketUpdateModal ? (
                        <Modal
                            show={ticketUpdateModal}
                            onHide={closeTicketUpdationModal}
                            backdrop="static"
                            keyboard={false}
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>UPDATE TICKET</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <div className="py-1">
                                        <h5 className="card-subtitle mb-3 text-primary lead">Ticket ID: {selectedTicket.id}</h5>
                                        <hr />
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon2">Title</span>
                                            <input type='text' className="form-control" name='title' value={selectedTicket.title} onChange={onTicketUpdate} required />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon2">Assignee</span>
                                            <input type='text' className="form-control" value={selectedTicket.assignee} disabled />
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon2">Status</span>
                                            <select className="form-select" name="status" value={selectedTicket.status} onChange={onTicketUpdate}>
                                                <option value="OPEN">OPEN</option>
                                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                                <option value="BLOCKED">BLOCKED</option>
                                                <option value="CLOSED">CLOSED</option>
                                            </select>
                                        </div>
                                        <div className="input-group mb-3">
                                            <span className="input-group-text" id="basic-addon2">PRIORITY</span>
                                            <input type="text" className="form-control" name="ticketPriority" value={selectedTicket.ticketPriority} onChange={onTicketUpdate} required />
                                        </div>
                                        <div className="amber-textarea active-amber-textarea-2">
                                            <textarea id="form16" className='md-textarea form-control' rows='3' name="description" placeholder="Description" value={selectedTicket.description} onChange={onTicketUpdate} required />
                                        </div>
                                    </div>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button className="mr-4" variant="secondary" onClick={closeTicketUpdationModal}>Cancel</Button>
                                <Button type="submit" onClick={updateTicket}>Update</Button>
                            </Modal.Footer>
                        </Modal>
                    ) : (
                        ""
                    )
                }
            </div>
        </div>
    );
}

export default Engineer;