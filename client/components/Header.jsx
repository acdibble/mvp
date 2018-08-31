import React, { Component } from 'react';
import {
  Navbar,
  FormGroup,
  FormControl,
  Button,
  InputGroup,
} from 'react-bootstrap';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
    };

    this.search = this.search.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleEnter({ key }) {
    if (key === 'Enter') {
      this.search();
    }
  }

  search() {
    this.setState({
      search: '',
    });
  }

  render() {
    const { search } = this.state;

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Welcome to uMTV
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form pullRight name="searchBox">
            <InputGroup>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Search"
                  name="search"
                  value={search}
                  onChange={this.handleChange}
                  onKeyUp={this.handleEnter}
                />
              </FormGroup>
              <InputGroup.Button>
                <Button
                  type="submit"
                  onClick={this.search}
                >
                  Submit
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </Navbar.Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
