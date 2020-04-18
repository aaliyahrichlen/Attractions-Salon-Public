import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import {  Reveal } from 'semantic-ui-react'
import "./Footer.css"


const Footer = () => {
    return (
      <div className="footer">
    <Segment color="black" inverted vertical style={{ padding: '5em 0em' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={3}>
          <Link className="foot-link" to="/Home">Home</Link>
          <br/>
          <Link className="foot-link" to="/Services">Services</Link>
          <br/>
          <Link className="foot-link" to="/About">About Us</Link>
          <br/>
          <Link className="foot-link" to="/Appointments">Request an Appointment</Link>
          <br/>
          <Link className="foot-link" to="/Login">Login</Link>
          <br/>
          <Link className="foot-link" to="/SignUp">Sign Up</Link>
          </Grid.Column>
          <Grid.Column width={7}>
            <p>
            Phone: (352) 376-6008
                      <br /> Address: 4509 NW 23 Ave, Gainesville, FL 32606
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
  </div>
    );
}

export default Footer;