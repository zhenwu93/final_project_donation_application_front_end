import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import { editUser } from '../actions/user'
import { Button, Form, Segment, Message } from 'semantic-ui-react'

class EditForm extends React.Component {
  state = {
    first_name: '',
    last_name: '',
    address: '',
    username: '',
    password: '',
    email: '',
    phone_number: ''
  }

  handleChange = (e, semanticInputData) => {
    this.setState({ [e.target.name ]: e.target.value })
  }

  handleEditSubmit = (e) => {
    //e.preventDefault() is taken care of by semantic forms
    // console.log('%c LOGIN FORM PROPS: ', 'color: red', this.props)
    this.props.editUser(
      this.state.username,
      this.state.password,
      this.state.first_name,
      this.state.last_name,
      this.state.address,
      this.state.phone_number,
      this.state.email
    ) // editUser from mapDispatchToProps

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
            name="first name"
            onChange={this.handleChange}
            value={this.state.first_name}
          />
          <Form.Input
            label="Last Name"
            placeholder="Last Name"
            name="last name"
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
            name="phone number"
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

const mapStateToProps = ({ usersReducer: { user: { first_name, last_name, username, phone_number, address, email } } }) => ({
  first_name,
  last_name,
  username,
  phone_number,
  address,
  email
})

export default withRouter(connect(mapStateToProps, { editUser })(EditForm))
