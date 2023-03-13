import React, { Component } from 'react'
import axios from 'axios'
import ReactSpeedometer from 'react-d3-speedometer'
import { Badge, Card, CardText, CardBody, CardTitle } from 'reactstrap'
import MockAdapter from 'axios-mock-adapter'
import { Container, Row, Col } from 'reactstrap'
import CreditEvents from '../Components/CreditEvents'

// import mock data

class MissedPayment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      missed: ''
    }
  }

  componentDidMount() {
    var mock = new MockAdapter(axios)
    mock.onGet('api/user/missed').reply(200, { missed: 1 })

    axios.get('api/user/missed').then(response => {
      this.setState({
        missed: response.data.missed
      })
    })
  }

  render() {
    return (
      <div className="my-3 my-md-5">
        <Container>
          <div className="page-header">
            <h1 className="page-title">
              You have missed <strong>{this.state.missed}%</strong> of your payments.
            </h1>
          </div>

          <Row className="row-deck">
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How does your oldest account compare?</CardTitle>
                  <CardText className="text-center">
                    <ReactSpeedometer
                      value={+this.state.missed}
                      minValue={0}
                      maxValue={5}
                      startColor={'#33CC33'}
                      endColor={'#FF471A'}
                    />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How does your payment history impact your score and how can you improve it?</CardTitle>
                  <CardText>
                    <ul>
                      <li>
                        A 100% on-time payment history is a good sign for lenders that you can reliably make payments.
                      </li>
                      <li>Even one late payment could hurt your credit health, so stay mindful of your due dates.</li>
                      <li>
                        Do not miss any of the next payments. <Badge>+3 points</Badge>
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <CreditEvents />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default MissedPayment
