import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const TopCard = props => {
  const color = props.positive ? 'green' : 'red'
  const direction = props.positive ? 'Positive Impact' : 'Negative Impact'

  return (
    <div className="col-6 col-sm-4 col-lg-2">
      <div className="card">
        <div className={`card-status bg-${color}`} />
        <div className="card-body p-3 text-center">
          <div className="h1 m-0">{props.value}</div>
          <div className="mb-4">{props.label}</div>
          <div className="text-muted mb-4">{props.description}</div>
          <div className={`text-${color} mb-4`}>{direction}</div>
          <Link to={`/${props.shortName}`}>
            <Button>Learn More</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopCard
