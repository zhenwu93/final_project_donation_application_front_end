import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { signupUser } from '../actions/user'
import { Button, Form, Segment, Message, Checkbox, Grid, Header, Image } from 'semantic-ui-react'

class SignUpForm extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    address: '',
    username: '',
    password: '',
    email: '',
    phone_number: ''
  }

  handleChange = (e) => {
    this.setState({ [e.target.name ]: e.target.value })
  }

  handleSignUpSubmit = (e) => {
    // console.log(e);
    this.props.signupUser(this.state, this.props.history)

    this.setState({
      first_name: '',
      last_name: '',
      address: '',
      username: '',
      password: '',
      email: '',
      phone_number: ''
     })
  }

  render() {
    return this.props.loggedIn ? (
      <Redirect to="/home" />
    ):(
      <Grid textAlign='center' style={{ height: '75%' }} verticalAlign='middle' id='signup'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Form
          id='signup-form'
          size='mini'
          key='mini'
          onSubmit={this.handleSignUpSubmit}
          loading={this.props.authenticatingUser}
          error={this.props.failedLogin}
        >
        <Segment stacked>
          <Form.Input
            fluid icon='user'
            iconPosition='left'
            label="Username"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <Form.Input
            fluid icon='lock'
            iconPosition='left'
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />

          <Form.Input
            label="First Name"
            placeholder="First Name"
            name="first_name"
            onChange={this.handleChange}
            value={this.state.first_name}
          />
          <Form.Input
            label="Last Name"
            placeholder="Last Name"
            name="last_name"
            onChange={this.handleChange}
            value={this.state.last_name}
          />
          <Form.Input
            fluid icon='mail'
            iconPosition='left'
            label="E-mail"
            placeholder="E-mail"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <Form.Input
            fluid icon='home'
            iconPosition='left'
            label="Address"
            placeholder="Address"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
          <Form.Input
            fluid icon='phone'
            iconPosition='left'
            label="Phone Number"
            placeholder="Phone Number"
            name="phone_number"
            onChange={this.handleChange}
            value={this.state.phone_number}
          />
            <Form.Field>
              <Checkbox label='I agree to the terms and conditions' />
            </Form.Field>
              <Button type="submit" color='red' fluid size='large'>Sign Up</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const mapStateToProps = ({ usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (state, history) => dispatch(signupUser(state, history))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm))
