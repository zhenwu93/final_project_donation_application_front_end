import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Segment } from 'semantic-ui-react'
import { createDonation } from '../actions/donation.js'
import { withRouter, Redirect } from 'react-router'
import withAuth from '../hocs/withAuth'

class CreateDonationForm extends React.Component {
  state = {
    description: '',
    avatar: ''
  }

  handleChange = (e) => {
    // console.log("Name :", e.target.name )
    // console.log("Name :", e.target.value )
    this.setState({ [e.target.name ]: e.target.value })
  }

  handleDonationSubmit = (e) => {
    // console.log("state is: ", this.state)
    // console.log("props is: ", this.props)
    // debugger

    this.props.createDonation(this.state, this.props.history)

    this.setState({
      description: '',
      avatar: ''
    })
  }

  render() {
    // console.log(this.props)
    // debugger
    // const { fireRedirect } = this.state
    return(
      <Segment>
        <Form
          size='mini'
          key='mini'
          onSubmit={this.handleDonationSubmit}
          loading={this.props.addingDonation}
          // error={this.failedLogin}
        >

        <Form.Group widths="equal">
          <Form.Input
            label="Date"
            placeholder="Date"
            name="date"
            onChange={this.handleChange}
            value={this.state.date}
          />
          <Form.Input
            label="Description"
            placeholder="Description"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <Form.Input
            label="Image"
            placeholder="Image"
            name="avatar"
            onChange={this.handleChange}
            value={this.state.avatar}
          />
          </Form.Group>
          <Button type="submit"> Create Donation </Button>
        </Form>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
    // debugger
  return {
    donations: state.donationsReducer.donations
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createDonation: (state, history) => dispatch(createDonation(state, history))
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateDonationForm)))
