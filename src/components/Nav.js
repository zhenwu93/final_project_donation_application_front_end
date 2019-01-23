import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import { Menu, Icon, Header, Image } from 'semantic-ui-react'
import logo from '../assets/logo.png'

const Nav = ({ user: {loggedIn}, location: { pathname } }) => {
  return (
    <Menu inverted icon='labeled' >
      {loggedIn? (
        <Fragment>
          <Menu.Item>
            <Image src={logo} size='tiny' bordered rounded/>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item as={NavLink} to='/home' name="Home" active={pathname === '/home'} >
              <Icon name='home'/>
                Home
            </Menu.Item>
            <Menu.Item as={NavLink} to='/profile' name="Profile" active={pathname === '/profile'} >
              <Icon name='user'/>
                Profile
            </Menu.Item>
            <Menu.Item as={NavLink} to='/donations' name="Donations" active={pathname === '/donations'} >
              <Icon name='gift'/>
                Donations
            </Menu.Item>
            <Menu.Item as={NavLink} to='/logout' name="Logout" active={pathname === '/logout'} >
              <Icon name='sign out'/>
                Sign Out
            </Menu.Item>
          </Menu.Menu>
        </Fragment>
      ) : (
        <Fragment>
          <Menu.Item>
            <Image src={logo} size='tiny' bordered rounded centered/>
          </Menu.Item>
          <Menu.Menu position='right' >
            <Menu.Item as={NavLink} to='/signup' name='Sign Up' active={pathname === '/signup'} >
              <Icon name='user' />
                Sign Up
            </Menu.Item>
            <Menu.Item as={NavLink} to='/login' name='Login' active={pathname === '/login'} >
              <Icon name='sign in'/>
                Login
            </Menu.Item>
          </Menu.Menu>
        </Fragment>
      )}
    </Menu>
  )
}

const mapStateToProps = ({ usersReducer: user }) => ({ user })

export default withRouter(connect(mapStateToProps)(Nav))
