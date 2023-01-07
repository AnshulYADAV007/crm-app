const { mockRequest, mockResponse } = require("../interceptor")
const { createTicket, getAllTickets, getOneTicket, updateTicket }
    = require("../../controllers/ticket.controller")
const User = require("../../models/user.model")
const Ticket = require("../../models/ticket.model")

const userTestPayload = {
    userType: "CUSTOMER",
    password: "12345678",
    name: "Test",
    userId: 1,
    email: "test@relevel.com",
    ticketsCreated: [],
    ticketsAssigned: [],
    save: jest.fn()
}

const ticketCreateTestPayload = {
    title: "Test",
    ticketPriority: 4,
    description: "Test",
    status: "OPEN",
    reporter: 1,
    assignee: 1,
    createdAt: Date.now(),
    updatedAt: Date.now()
}

const ticketTestPayload = {
    title: "Test",
    ticketPriority: 4,
    description: "Test",
    status: "OPEN",
    assignee: 1,
    save: jest.fn().mockReturnValue(Promise.resolve(ticketCreateTestPayload))
}