import React, { Component } from 'react'
import axios from 'axios'
import ReactSpeedometer from 'react-d3-speedometer'
import { Badge, Card, CardText, CardBody, CardTitle } from 'reactstrap'
import MockAdapter from 'axios-mock-adapter'
import { Container, Row, Col } from 'reactstrap'
import CreditEvents from '../Components/CreditEvents'

// import mock data

class HardInquiries extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inquiries: 3
    }
  }

  componentDidMount() {
    var mock = new MockAdapter(axios)
    mock.onGet('api/user/inquiries').reply(200, { inquiries: 3 })

    axios.get('api/user/inquiries').then(response => {
      this.setState({
        inquiries: response.data.inquiries
      })
    })
  }

  render() {
    return (
      <div className="my-3 my-md-5">
        <Container>
          <div className="page-header">
            <h1 className="page-title">
              You have <strong>{this.state.inquiries}</strong> recent credit inquiries.
            </h1>
          </div>
          <Row className="row-deck">
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How does your oldest account compare?</CardTitle>
                  <CardText className="text-center">
                    <ReactSpeedometer
                      value={this.state.inquiries}
                      minValue={0}
                      maxValue={7}
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
                  <CardTitle>How does your credit history impact your score and how can you improve it?</CardTitle>
                  <CardText>
                    <ul>
                      <li>
                        Hard inquiries from things like credit applications can stay on your report for up to 2 years,
                        but their effects tend to fade over time.
                      </li>
                      <li>
                        Limit the number of new credit applications. <Badge>+15 points</Badge>
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

export default HardInquiries
