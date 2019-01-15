import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { loginUser } from '../actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'

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

  render() {
    // console.log('%c LOGIN FORM PROPS: ', 'color: red', this.props)
    return this.props.loggedIn ? ( //if user is logged in, redirect to profile
      <Redirect to= "/profile" />
    ) : (
      <Segment>
      <Form
        size='mini'
        key='mini'
        onSubmit={this.handleLoginSubmit}
        loading={this.props.authenticatingUser}
        error={this.failedLogin}
      >
        <Message error header={ this.props.failedLogin? this.props.error: null } />
        <Form.Group widths="equal">
          <Form.Input
            label="Username"
            placeholder="Username"
            name="username"
            onChange={this.handleChange}
            value={this.state.username}
          />
          <Form.Input
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            value={this.state.password}
          />
          </Form.Group>
          <Button type="submit"> Login </Button>
        </Form>
      </Segment>
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
