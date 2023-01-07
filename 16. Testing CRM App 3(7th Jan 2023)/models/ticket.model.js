const mongoose = require("mongoose")
const { ticketStatus } = require("../utils/constants")

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ticketPriority: {
        type: String,
        required: true,
        default: 4,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: ticketStatus.open,
    },
    reporter: {
        type: String,
    },
    assignee: {
        type: String,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model("Ticket", ticketSchema)