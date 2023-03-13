import React from 'react'
import { Table } from 'reactstrap'

const Tableau = props => {
  const header = props.data[0] && Object.keys(props.data[0])
  const data = props.data

  return (
    <div className="card">
      <div className="card-header">{props.title}</div>
      <div className="table-responsive">
        <Table>
          <thead>
            <tr>
              <th>#</th>
              {header && header.map((title, i) => <th key={`th-${i}`}>{title}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.map((line, i) => (
              <tr key={`tr-${i}`}>
                <th key={`th-${i}`} scope="row">
                  {i + 1}
                </th>
                {header.map((title, j) => <td key={`td-${i}${j}`}>{line[title]}</td>)}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Tableau
