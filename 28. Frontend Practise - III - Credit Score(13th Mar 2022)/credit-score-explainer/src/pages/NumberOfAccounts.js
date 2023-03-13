import React, { Component } from 'react'
import axios from 'axios'
import ReactSpeedometer from 'react-d3-speedometer'
import { Badge, Card, CardText, CardBody, CardTitle } from 'reactstrap'
import MockAdapter from 'axios-mock-adapter'
import { Container, Row, Col } from 'reactstrap'
import Table from '../Components/Table'

// import mock data
import mockAccounts from '../data/accounts.json'

class Accounts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    }
  }

  componentDidMount() {
    var mock = new MockAdapter(axios)
    mock.onGet('user/accounts').reply(200, mockAccounts)

    axios.get('user/accounts').then(response => {
      this.setState({
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
              Your have <strong>{this.state.accounts.length}</strong> open accounts.
            </h1>
          </div>

          <Row className="row-deck">
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>How does your number of accounts compare?</CardTitle>
                  <CardText className="text-center">
                    <ReactSpeedometer value={this.state.accounts.length} minValue={0} maxValue={21} />
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardBody>
                  <CardTitle>
                    How does your number of open accounts impact your score and how can you improve it?
                  </CardTitle>
                  <CardText>
                    <ul>
                      <li>
                        Keep your accounts open, even if you are not using them. <Badge>+5 points</Badge>
                      </li>
                      <li>Lenders typically like to see that you've used a variety of accounts responsibly.</li>
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

export default Accounts
