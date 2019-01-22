import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { editUser } from '../actions/user'
import { Button, Form, Segment } from 'semantic-ui-react'
import withAuth from '../hocs/withAuth'

class EditForm extends React.Component {
  state = {
    id: '',
    first_name: '',
    last_name: '',
    address: '',
    username: '',
    password: '',
    email: '',
    phone_number: '',
  }

  static getDerivedStateFromProps(props) {
    let { user } = props
    return {
      id: user.id
    }
  }

  handleChange = (e) => {
    // console.log("Name :", e.target.name )
    // console.log("Name :", e.target.value )
    this.setState({ [e.target.name ]: e.target.value })
  }

  handleEditSubmit = (e) => {
    //e.preventDefault() is taken care of by semantic forms
    // console.log('%c EDIT FORM PROPS: ', 'color: blue', this.props)

    this.props.editUser(this.state, this.props.history) // editUser from mapDispatchToProps

    this.setState({
      first_name: '',
      last_name: '',
      address: '',
      username: '',
      password: '',
      email: '',
      phone_number: ''
     }) //reset form to initial state
  }

  render() {
    // console.log(this.props);
    // console.log(this.props.history);
    // console.log(this.state);

    return(
      <Segment>
      <Form
        size='mini'
        key='mini'
        onSubmit={this.handleEditSubmit}
        loading={this.props.authenticatingUser}
      >
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
            label="E-mail"
            placeholder="E-mail"
            name="email"
            onChange={this.handleChange}
            value={this.state.email}
          />
          <Form.Input
            label="Address"
            placeholder="Address"
            name="address"
            onChange={this.handleChange}
            value={this.state.address}
          />
          <Form.Input
            label="Phone Number"
            placeholder="Phone Number"
            name="phone_number"
            onChange={this.handleChange}
            value={this.state.phone_number}
          />
          </Form.Group>
          <Button type="submit">Save Changes</Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  // const { id, first_name, last_name, username, phone_number, address, email } = state.usersReducer.user;
  // console.log('mapStateToProps', id, first_name, last_name, username, phone_number, address, email);
  return {
    user: state.usersReducer.user
  }
}

const mapDispatchToProps = (dispatch) => {
  // console.log('state is', state);
  // console.log('history is', props.history);
  return {
    editUser: (state, history) => dispatch(editUser(state, history))
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(withRouter(EditForm)))
