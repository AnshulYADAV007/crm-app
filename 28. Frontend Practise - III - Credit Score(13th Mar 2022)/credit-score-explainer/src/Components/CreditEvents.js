import React, { Component } from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import mockEvents from '../data/events.json'

class CreditEvents extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
  }

  componentDidMount() {
    var mock = new MockAdapter(axios)
    mock.onGet('user/events').reply(200, mockEvents)

    axios.get('user/events').then(response => {
      this.setState(response.data)
    })
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Credit Events</h3>
        </div>
        <div className="card-body">
          <ul className="timeline">
            {this.state.events &&
              this.state.events.map((event, i) => (
                <li key={`li-${i}`} className="timeline-item">
                  <div className="timeline-badge" />
                  {event.name}
                  <div className="timeline-time">{event.when}</div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default CreditEvents
