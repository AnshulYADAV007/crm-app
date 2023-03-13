import React, { Component } from 'react'
import axios from 'axios'
import ReactSpeedometer from 'react-d3-speedometer'
import { Badge, Card, CardText, CardBody, CardTitle } from 'reactstrap'
import MockAdapter from 'axios-mock-adapter'
import { Container, Row, Col } from 'reactstrap'
import Table from '../Components/Table'

// import mock data
import mockAccounts from '../data/accounts.json'

class CreditHistory extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oldest: 0,
      average: 0,
      accounts: []
    }
  }

  componentDidMount() {
    var mock = new MockAdapter(axios)
    mock.onGet('api/user/accounts').reply(200, mockAccounts)

    axios.get('api/user/accounts').then(response => {
      // let's compute the average and the max
      const year = new Date().getFullYear()
      const ages = response.data.accounts.map(account => +account.year)
      const average = Math.round(year - ages.reduce((a, b) => a + b, 0) / ages.length)
      const oldest = year - Math.min(...ages)

      this.setState({
        oldest: oldest,
        average: average,
        accounts: response.data.accounts
      })
    })
  }

  render() {
    return (
      <div className="my-3 my-md-5">
        <Container>
          <div className="page-header">
            <h1 className="page-title">
              Your oldest opened credit account is <strong>{this.state.oldest}</strong> years old. On average your
              credit accounts are <strong>{this.state.average}</strong> years old.
            </h1>
          </div>

          <Row>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How does your oldest account compare?</CardTitle>
                  <CardText className="text-center">
                    <ReactSpeedometer value={this.state.oldest} minValue={0} maxValue={30} />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How does your average compare?</CardTitle>
                  <CardText className="text-center">
                    <ReactSpeedometer value={this.state.average} minValue={0} maxValue={20} />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row className="row-deck">
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How does your credit history impact your score and how can you improve it?</CardTitle>
                  <CardText>
                    <ul>
                      <li>Keep your accounts open, even if you are not using them.</li>
                      <li>Lenders typically like to see that you have experience using. credit responsibly.</li>
                      <li>
                        Improve your age of credit history over time by keeping your accounts open and in good standing.{' '}
                        <Badge>+5 points</Badge>
                      </li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Table data={this.state.accounts} title={'Current Accounts'} />
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default CreditHistory
