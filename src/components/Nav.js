import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Nav = ({ user: {loggedIn}, location: { pathname } }) => {
  return (
    <Menu pointing secondary>
      {loggedIn? (
        <Fragment>
          <Menu.Item as={NavLink} to='/home' name="Home" active={pathname === '/home'} />
          <Menu.Item as={NavLink} to='/profile' name="Profile" active={pathname === '/profile'} />
          <Menu.Item as={NavLink} to='/donations' name="Donations" active={pathname === '/donations'} />
          <Menu.Item as={NavLink} to='/logout' name="Logout" active={pathname === '/logout'} />
          <Menu.Menu position="right">
            {/* TODO: Donations*/}
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item as={NavLink} to='/signup' name='Sign Up' active={pathname === '/signup'} />
          <Menu.Item as={NavLink} to='/login' name='Login' active={pathname === '/login'} />
        </Fragment>
      )}
    </Menu>
  )
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps)(Nav))
