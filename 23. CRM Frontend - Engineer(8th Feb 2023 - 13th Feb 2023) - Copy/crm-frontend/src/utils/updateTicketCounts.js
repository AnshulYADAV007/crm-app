const updateTicketCounts = (tickets, setTicketStatusCount) => {
    const data = {
        open: 0,
        closed: 0,
        in_progress: 0,
        blocked: 0,
        total: 0
    }
    tickets.map(x => {
        if (x.status === "OPEN") data.open++
        else if (x.status === 'IN_PROGRESS') data.in_progress++
        else if (x.status === 'BLOCKED') data.blocked++
        else if (x.status === 'CLOSED') data.closed++
    })
    data.total = data.open + data.in_progress + data.blocked + data.closed
    data.total = (data.total === 0) ? 1 : data.total
    setTicketStatusCount(data)
}

export default updateTicketCounts