import React from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

export default class Hamburger extends React.Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    })
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret>
          <span className="header-toggler-icon" />
        </DropdownToggle>
        <DropdownMenu right>
          <Link to="/">
            <DropdownItem>Home</DropdownItem>
          </Link>
          <Link to="/history">
            <DropdownItem>Credit History</DropdownItem>
          </Link>
          <Link to="/accounts">
            <DropdownItem>Accounts</DropdownItem>
          </Link>
          <Link to="/utilization">
            <DropdownItem>Credit Use</DropdownItem>
          </Link>
          <Link to="/missed-payments">
            <DropdownItem>Payments</DropdownItem>
          </Link>
          <Link to="/hard-inquiries">
            <DropdownItem>Hard Inquiries</DropdownItem>
          </Link>
          <Link to="/marks">
            <DropdownItem>Derogatory Marks</DropdownItem>
          </Link>
        </DropdownMenu>
      </Dropdown>
    )
  }
}
