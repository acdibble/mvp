import React from 'react';
import PropTypes from 'prop-types';
import {
  Navbar,
  FormGroup,
  FormControl,
  Button,
  InputGroup,
} from 'react-bootstrap';

const Header = (props) => {
  const {
    query,
    handleChange,
    search,
    loggedIn,
  } = props;

  const handleEnter = ({ key }) => {
    if (key === 'Enter') {
      search();
    }
  };

  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          Welcome to uMTV
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullRight name="searchBox">
          {loggedIn
            ? (
              <InputGroup>
                <FormGroup>
                  <FormControl
                    type="text"
                    placeholder="Search"
                    name="query"
                    value={query}
                    onChange={handleChange}
                    onKeyUp={handleEnter}
                  />
                </FormGroup>
                <InputGroup.Button>
                  <Button
                    type="submit"
                    onClick={search}
                  >
                Submit
                  </Button>
                </InputGroup.Button>
              </InputGroup>
            ) : (
              <InputGroup>
                <Button>Login</Button>
              </InputGroup>
            )}
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

Header.propTypes = {
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Header;
