import React, { Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import Profile from './components/Profile'
import LoginForm from './components/LoginForm'
import LogOutPage from './components/LogOutPage'
import Nav from './components/Nav'
import NotFound from './components/NotFound'
import EditForm from './components/EditForm'
import './App.css'

const App = props => {
   // console.log('%c APP Props: ', 'color: firebrick', props)
   return (
     <Fragment>
        <Nav />
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/profile'/> } />

            <Route exact path='/profile' component={Profile} />
            <Route exact path='/edit' component={EditForm} />
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/logout' component={LogOutPage} />
            <Route component= {NotFound} />
          </Switch>
     </Fragment>
   )
}

export default withRouter(App)
