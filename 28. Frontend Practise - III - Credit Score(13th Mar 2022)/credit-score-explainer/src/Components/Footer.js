import React from 'react'

const Footer = props => {
  return (
    <div>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-6 col-md-3">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="https://www.myfico.com/fico-credit-score-estimator/estimator/">
                        FICO Credit Score Estimator
                      </a>
                    </li>
                    <li>
                      <a href="https://www.experian.com/blogs/ask-experian/credit-education/score-basics/what-is-a-good-credit-score/">
                        What is a good credit score?
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-6 col-md-3">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a href="https://en.wikipedia.org/wiki/Credit_score_in_the_United_States#FICO_score">Wikipedia</a>
                    </li>
                    <li>
                      <a href="https://creditkarma.com">Credit Karma</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0">All data is mock data.</div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <div className="row align-items-center flex-row-reverse">
            <div className="col-auto ml-lg-auto">
              <div className="row align-items-center">
                <div className="col-auto">
                  <a href="https://github.com/alaq/credit-score-explainer" className="btn btn-outline-primary btn-sm">
                    Source code
                  </a>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-auto mt-3 mt-lg-0 text-center">
              This is an exprimentation by{' '}
              <a href="https://alaq.io" target="_blank" rel="noopener noreferrer">
                Adrien Lacquemant
              </a>. Find more on my{' '}
              <a href="https://github.com/alaq/" target="_blank" rel="noopener noreferrer">
                Github
              </a>.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
