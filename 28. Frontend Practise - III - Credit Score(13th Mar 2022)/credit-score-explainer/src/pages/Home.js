import React, { Component } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Container, Row, Col } from "reactstrap";
import { TopCard, Table, CreditEvents, ScoreHeader } from "../Components";

// import mock data
import mockImpacts from "../data/impacts.json";
import mockAccounts from "../data/accounts.json";
import mockEvents from "../data/events.json";
// import mockGraph from "../data/graph.json";

export function better(score) {
  let betterThan;
  if (score > 850) return;
  else if (score >= 800) betterThan = 80;
  else if (score >= 740) betterThan = 55;
  else if (score >= 670) betterThan = 34;
  else if (score >= 580) betterThan = 16;
  else betterThan = 0;
  return betterThan;
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      impacts: [],
      accounts: [],
      events: [],
      graph: {},
      score: 0,
      betterThan: 0
    };
  }

  componentDidMount() {
    var mock = new MockAdapter(axios);
    mock.onGet("api/user/impacts").reply(200, mockImpacts);
    mock.onGet("api/user/accounts").reply(200, mockAccounts);
    mock.onGet("api/user/events").reply(200, mockEvents);
    mock.onGet("api/user/graph").reply(200, { score: 725 });

    axios.get("api/user/impacts").then(response => {
      this.setState(response.data);
    });
    axios.get("api/user/accounts").then(response => {
      this.setState(response.data);
    });
    axios.get("api/user/events").then(response => {
      this.setState(response.data);
    });
    axios.get("api/user/graph").then(response => {
      const score = response.data.score;
      this.setState({ score: score, betterThan: better(score) });
    });
  }

  render() {
    return (
      <div className="my-3 my-md-5">
        <Container>
          {this.state.betterThan !== undefined ? (
            <div className="page-header">
              <h1 className="page-title">
                Your FICO score is <strong>725</strong>. It is better than <strong>{this.state.betterThan}%</strong> of the population.</h1>
            </div>
          ) : (
            ""
          )}

          <ScoreHeader />
          <div className="page-header">
            <h1 className="page-title">Factors that impact your credit score</h1>
          </div>
          <Row className="row-cards">
            {this.state.impacts &&
              this.state.impacts.map((impact, i) => {
                return (
                  <TopCard
                    key={`topcard-${i}`}
                    value={impact.value}
                    label={impact.name}
                    positive={impact.isPositive}
                    description={impact.description}
                    shortName={impact.shortName}
                  />
                );
              })}
          </Row>
          <Row className="row-cards row-deck">
            <Col lg="6">
              <CreditEvents />
            </Col>
            <Col lg="6">
              <Table data={this.state.accounts} title={"Current Accounts"} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
