import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
// import * as actions from '../actions'
import { fetchCurrentUser } from '../actions/user'
import { Loader } from 'semantic-ui-react'

const withAuth = (WrappedComponent)  => {
  class AuthorizedComponent extends React.Component {
    componentDidMount() {
      // console.log('%c INSIDE COMPONENT DID MOUNT FOR AUTH HOC', 'color: purple')
      //if I have token, but don't know who it belongs to, ask server to fetch user data
      if (localStorage.getItem('jwt') && !this.props.loggedIn) this.props.fetchCurrentUser()
    }

    render() {
      // console.log('%c INSIDE RENDER FOR HOC', 'color: green')
      //if I have token and logged in, wrapped component is Profile
      if (localStorage.getItem('jwt') && this.props.loggedIn) {
        return <WrappedComponent />
        //currently fetching, load spinner
      } else if (localStorage.getItem('jwt') && (this.props.authenticatingUser || !this.props.loggedIn)) {
        return <Loader active inline="centered" />
      } else {
        //user is not authorized, return to log in page
        return <Redirect to="api/v1/login" />
      }
    }
  }

  const mapStateToProps = (reduxStoreState) => {
    return {
      loggedIn: reduxStoreState.usersReducer.loggedIn,
      authenticatingUser: reduxStoreState.usersReducer.authenticatingUser
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
      fetchCurrentUser: () => dispatch(fetchCurrentUser()),
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(AuthorizedComponent)
} //end of withAuth

export default withAuth
