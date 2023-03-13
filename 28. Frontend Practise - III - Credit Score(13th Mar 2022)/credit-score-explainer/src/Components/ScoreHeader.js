import React from 'react'
import { Row, Card, CardTitle, CardText, Col, CardBody } from 'reactstrap'
import ReactSpeedometer from 'react-d3-speedometer'
import Graph from './Graph'

const ScoreHeader = props => {
  return (
    <Row className="row-cards row-deck">
      <Col lg="4">
        <Card>
          <CardBody>
            <CardTitle>You are above the national average.</CardTitle>
            <CardText>
              This is generally considered a good score and well above the national average. Keep up the good work and
              read on to understand how you can keep it that way.
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col lg="4">
        <Card>
          <CardBody style={{ padding: 0 }}>
          <Graph data={props.data} />
          </CardBody>
        </Card>
      </Col>
      <Col lg="4">
        <Card>
          <CardBody className="text-center">
            <ReactSpeedometer minValue={300} value={725} maxValue={850} fluidWidth={false} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default ScoreHeader
