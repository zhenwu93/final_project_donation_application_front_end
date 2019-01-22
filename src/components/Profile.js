import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth'
import { Button } from 'semantic-ui-react'

class Profile extends React.Component {

  render() {
    return(
      <Fragment>
        <div className="ui form">
          <div className="six fields">
            <div className="field">
              <label>First Name</label>
              <input value={this.props.first_name} readOnly type="text"/>
            </div>
            <div className="field">
              <label>Last Name</label>
              <input value={this.props.last_name} readOnly type="text"/>
            </div>
            <div className="field">
              <label>Username</label>
              <input value={this.props.username} readOnly type="text"/>
            </div>
            <div className="field">
              <label>E-mail</label>
              <input value={this.props.email} readOnly type="text"/>
            </div>
            <div className="field">
              <label>Phone Number</label>
              <input value={this.props.phone_number} readOnly type="text"/>
            </div>
            <div className="field">
              <label>Address</label>
              <input value={this.props.address} readOnly type="text"/>
            </div>
          </div>
          <Button as={Link} to="/edit">Edit</Button>
        </div>
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
