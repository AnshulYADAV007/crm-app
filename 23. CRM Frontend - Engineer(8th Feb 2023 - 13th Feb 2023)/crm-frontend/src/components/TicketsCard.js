import React from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

const TicketsCard = (props) => {
    return (
        <div className="col-xs-12 col-lg-3 col-md-6 my-1">
            <div className={`card  cardItem shadow  ${props.color} text-dark bg-opacity-25 ${props.borders}`} style={{ width: 15 + 'rem' }}>
                <div className="card-body">
                    <h5 className="card-subtitle mb-2"><i className={`bi ${props.icon} text-primary mx-2`}></i>{props.type}</h5>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h1 className="col text-dark mx-4">{props.count}</h1>
                        </div>
                        <div className="col">
                            <div style={{ width: 40, height: 40 }}>
                                <CircularProgressbar value={(props.count / props.total) * 100} styles={buildStyles({
                                    textColor: "red",
                                    pathColor: "darkblue",
                                })} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TicketsCard