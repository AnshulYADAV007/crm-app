import React from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const TicketsCard = (props) => {
    return (
        <div className={`cardItem shadow ${props.type} ${props.color} text-dark bg-opacity-25 ${props.borders}`}>
            <div className="card-body">
                <h5 className="card-subtitle">
                    <i className={`bi ${props.icon} text-primary mx-2`}></i>
                    <span>{props.type}</span>
                </h5>
                <hr />
                <div className="details">
                    <CircularProgressbar value={(props.count / props.total) * 100} styles={buildStyles({
                        textColor: "red",
                        pathColor: "darkblue",
                    })} className='circle' />
                    <div className="count">
                        <h1 className="col text-dark mx-4">{props.count}</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketsCard