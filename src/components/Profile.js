import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth'
import { Form, Button, Grid, Segment, Header } from 'semantic-ui-react'
import './stylesheet.css'

class Profile extends React.Component {

  render() {
    return(
      <Fragment>
        <Grid textAlign='center' style={{ height: '75%' }} verticalAlign='middle' id="profile-background">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='mini' key='mini' id='profile-form'>
              <Segment stacked>
                <Header as='h2' color='black' textAlign='center'>
                  Account Details
                </Header>

                <Form.Input
                  fluid icon='user'
                  iconPosition='left'
                  label="Username"
                  placeholder="Username"
                  name="username"
                  readOnly
                  value={this.props.username}
                />
                <Form.Input
                  label="First Name"
                  placeholder="First Name"
                  name="first_name"
                  readOnly
                  value={this.props.first_name}
                />
                <Form.Input
                  label="Last Name"
                  placeholder="Last Name"
                  name="last_name"
                  readOnly
                  value={this.props.last_name}
                />
                <Form.Input
                  fluid icon='mail'
                  iconPosition='left'
                  label="E-mail"
                  placeholder="E-mail"
                  name="email"
                  readOnly
                  value={this.props.email}
                />
                <Form.Input
                  fluid icon='home'
                  iconPosition='left'
                  label="Address"
                  placeholder="Address"
                  name="address"
                  readOnly
                  value={this.props.address}
                />
                <Form.Input
                  fluid icon='phone'
                  iconPosition='left'
                  label="Phone Number"
                  placeholder="Phone Number"
                  name="phone_number"
                  readOnly
                  value={this.props.phone_number}
                />
                <Button as={Link} to="/edit" color='red' fluid size='large'>Edit</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ usersReducer: { user: { id, first_name, last_name, username, phone_number, address, email } } }) => ({
  id,
  first_name,
  last_name,
  username,
  phone_number,
  address,
  email
})

export default withRouter(withAuth(connect(mapStateToProps)(Profile)))
