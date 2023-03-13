import React, { Component } from 'react'
import axios from 'axios'
import ReactSpeedometer from 'react-d3-speedometer'
import { Card, CardText, CardBody, CardTitle } from 'reactstrap'
import MockAdapter from 'axios-mock-adapter'
import { Container, Row, Col } from 'reactstrap'

// import mock data

class DerogatoryMarks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marks: 0
    }
  }

  componentDidMount() {
    var mock = new MockAdapter(axios)
    mock.onGet('api/user/marks').reply(200, { marks: 0 })

    axios.get('api/user/marks').then(response => {
      this.setState({
        marks: response.data.marks
      })
    })
  }

  render() {
    return (
      <div className="my-3 my-md-5">
        <Container>
          <div className="page-header">
            <h1 className="page-title">
              You have <strong>{this.state.marks}</strong> derogatory marks on your account.
            </h1>
          </div>

          <Row className="row-deck">
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How do your marks compare?</CardTitle>
                  <CardText className="text-center">
                    <ReactSpeedometer
                      value={this.state.oldest}
                      minValue={0}
                      maxValue={4}
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
                      <li>Derogatory marks are good to avoid — they can stay on your report for 7-10 years.</li>
                      <li>
                        If you haven't already, set up automatic bill pay to make monthly payments more convenient.
                        Autopay could help prevent accounts from becoming past due and possibly going into collections.
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default DerogatoryMarks
