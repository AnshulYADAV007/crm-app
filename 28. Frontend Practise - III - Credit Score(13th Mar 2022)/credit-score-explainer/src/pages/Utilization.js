import React, { Component } from 'react'
import { Badge, Card, CardText, CardBody, CardTitle } from 'reactstrap'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import ReactSpeedometer from 'react-d3-speedometer'
import { Container, Row, Col } from 'reactstrap'
import { Table } from '../Components'

// import mock data
import mockAccounts from '../data/accounts.json'

class Utilization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      use: 0,
      accounts: []
    }
  }

  componentDidMount() {
    var mock = new MockAdapter(axios)
    mock.onGet('user/accounts').reply(200, mockAccounts)

    axios.get('user/accounts').then(response => {
      const uses = response.data.accounts.map(account => +account.balance)
      const total = response.data.accounts.map(account => +account['credit limit'])

      const use = Math.round(uses.reduce((a, b) => a + b) / total.reduce((a, b) => a + b) * 100, 2)

      this.setState({
        accounts: response.data.accounts,
        use: use
      })
    })
  }

  render() {
    return (
      <div className="my-3 my-md-5">
        <Container>
          <div className="page-header">
            <h1 className="page-title">
              Your current credit use is <strong>{this.state.use}%</strong>.
            </h1>
          </div>

          <Row className="row-deck">
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How does your credit use compare?</CardTitle>
                  <CardText className="text-center">
                    <ReactSpeedometer
                      value={this.state.use}
                      minValue={0}
                      maxValue={100}
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
                  <CardTitle>How does your credit use impact your score and how can you improve it?</CardTitle>
                  <CardText>
                    <ul>
                      <li>Using less than 30% of your credit limit is generally recommended.</li>
                      <li>
                        Keep the use limited, the lower the better. <Badge>+5 points</Badge>
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table data={this.state.accounts} title={'Current Accounts'} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Utilization
