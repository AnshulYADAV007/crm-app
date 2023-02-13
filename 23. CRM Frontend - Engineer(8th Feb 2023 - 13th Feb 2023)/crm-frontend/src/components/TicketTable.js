import React from "react"
import MaterialTable from "@material-table/core"
import { ExportCsv, ExportPdf } from "@material-table/exporters"

function TicketTable(props) {
    return (
        <MaterialTable
            onRowClick={(event, rowData) => props.editTicket(rowData)}
            data={props.ticketDetails}
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
                    exportFunc: (cols, datas) => ExportCsv(cols, datas, 'ticketRecords')
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
    )
}

export default TicketTable