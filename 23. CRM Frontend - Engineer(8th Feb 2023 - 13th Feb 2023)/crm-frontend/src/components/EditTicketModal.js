import React from "react"
import { Modal, Button } from "react-bootstrap"

function EditTicketModal(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
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
                        <h5 className="card-subtitle mb-3 text-primary lead">Ticket ID: {props.selectedTicket.id}</h5>
                        <hr />
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2">Title</span>
                            <input type='text' className="form-control" name='title' value={props.selectedTicket.title} onChange={props.onTicketUpdate} required />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2">Assignee</span>
                            <input type='text' className="form-control" value={props.selectedTicket.assignee} disabled />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2">Status</span>
                            <select className="form-select" name="status" value={props.selectedTicket.status} onChange={props.onTicketUpdate}>
                                <option value="OPEN">OPEN</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="BLOCKED">BLOCKED</option>
                                <option value="CLOSED">CLOSED</option>
                            </select>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2">PRIORITY</span>
                            <input type="text" className="form-control" name="ticketPriority" value={props.selectedTicket.ticketPriority} onChange={props.onTicketUpdate} required />
                        </div>
                        <div className="amber-textarea active-amber-textarea-2">
                            <textarea id="form16" className='md-textarea form-control' rows='3' name="description" placeholder="Description" value={props.selectedTicket.description} onChange={props.onTicketUpdate} required />
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="mr-4" variant="secondary" onClick={props.onHide}>Cancel</Button>
                <Button type="submit" onClick={props.updateTicket}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditTicketModal