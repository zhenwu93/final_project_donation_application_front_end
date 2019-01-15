import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import {logOut} from '../actions/user'

class LogOutPage extends React.Component {
  componentDidMount() {
    this.props.logOut()
  }
  
  render() {
    return <Redirect to= "/login"/>
  }
}

const mapStateToProps = ({usersReducer: { authenticatingUser, failedLogin, error, loggedIn} }) => ({
  authenticatingUser,
  failedLogin,
  error,
  loggedIn,
})

export default withRouter(connect(mapStateToProps, { logOut })(LogOutPage))
