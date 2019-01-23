import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../actions/user'
import { Button, Form, Segment, Message, Grid, Image, Header } from 'semantic-ui-react'
import './stylesheet.css'

class LoginForm extends React.Component {
  state = { username: '', password: '' }

  handleChange = (e, semanticInputData) => {
    this.setState({ [e.target.name ]: e.target.value }) //handles username && password
  }

  handleLoginSubmit = (e) => {
    //e.preventDefault() is taken care of by semantic forms
    // console.log('%c LOGIN FORM PROPS: ', 'color: red', this.props)
    this.props.loginUser(this.state.username, this.state.password) // loginUser from mapDispatchToProps
    this.setState({ username: '', password: '' }) //reset form to initial state
  }

  handleClick = (e) => {
    console.log(e);
  }

  render() {
    // console.log('%c LOGIN FORM PROPS: ', 'color: red', this.props)
    return this.props.loggedIn ? ( //if user is logged in, redirect to profile
      <Redirect to= "/home" />
    ) : (
      <>
      <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' id='login-background'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Form
          size='large'
          key='mini'
          onSubmit={this.handleLoginSubmit}
          loading={this.props.authenticatingUser}
          error={this.failedLogin}
          id='login-form'
        >
        <Segment stacked>
        <Message error header={ this.props.failedLogin? this.props.error: null } />
        <Form.Group widths="equal">
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
          </Form.Group>
          <Button type="submit" color='red' fluid size='large'> Login </Button>
          </Segment>
        </Form>
          <Message id='login-message'>
            Don't have an account? <a href='/signup' onClick={this.handleClick}>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </>
    )
  }
} // end of Login Form

const mapStateToProps = ({usersReducer: { authenticatingUser, failedLogin, error, loggedIn } }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn
})

export default withRouter(connect(mapStateToProps, { loginUser })(LoginForm))
