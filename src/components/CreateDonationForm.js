import React from 'react'
import { connect } from 'react-redux'
import { createDonation } from '../actions/donation.js'
import { withRouter, Redirect } from 'react-router'
import withAuth from '../hocs/withAuth'
import { Form, Button, Segment, Grid, Image, Header } from 'semantic-ui-react'
import './stylesheet.css'

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
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' id="donation-background">
        <Grid.Column style={{ maxWidth: 450 }}>

        <Form
          id='create-donation-form'
          size='mini'
          key='mini'
          onSubmit={this.handleDonationSubmit}
          loading={this.props.addingDonation}
          // error={this.failedLogin}
        >
        <Segment stacked>
        <Header as='h2' color='black' textAlign='center'>
          Submit a Donation
        </Header>
          <Form.Input
            fluid icon='calendar'
            iconPosition='left'
            type='date'
            label="Date"
            placeholder="Date"
            name="date"
            onChange={this.handleChange}
            value={this.state.date}
          />
          <Form.Input
            fluid icon='image'
            iconPosition='left'
            label="Image"
            placeholder="Image"
            name="avatar"
            onChange={this.handleChange}
            value={this.state.avatar}
          />
          <Form.TextArea
            label="Description"
            placeholder="Description"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
            <Button type="submit" color='red' fluid size='large'> Create Donation </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
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
