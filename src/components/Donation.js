import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchDonations } from '../actions/donation.js'
import { Image, Table, Icon, Segment, Grid } from 'semantic-ui-react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import withAuth from '../hocs/withAuth'

class Donation extends React.Component {

  componentDidMount() {
      // debugger
      this.props.fetchDonations()
  }

  render() {
    // debugger

    let donationDetail = this.props.donations.donations.map(donation => {
      let newDate = new Date(donation.created_at)
      let donationMonth = newDate.getMonth() + 1
      let donationDate = newDate.getDate()
      let donationYear = newDate.getFullYear()
      let formattedDate = `${donationMonth}/${donationDate}/${donationYear}`

      // let changeStatus = () => {
      //   console.log('status before:', donation.status);
      //   if (donation.status === 'Accepted') {
      //     setTimeout((donation.status = 'Delivered'), 10000)
      //     console.log('status after:', donation.status);
      //     // debugger
      //   } else {
      //     donation.status = 'Accepted'
      //   }
      // }

      return (
        <Table.Row key={donation.id}>
         <Table.Cell textAlign='center'>{formattedDate}</Table.Cell>
         <Table.Cell textAlign='center'>{donation.description}</Table.Cell>
         <Table.Cell collapsing><Image src={donation.avatar} size='small' bordered /></Table.Cell>
         <Table.Cell >{ donation.status } </Table.Cell>
         <Table.Cell >{donation.status === 'Delivered' ? donation.destination : 'Pending' }</Table.Cell>
        </Table.Row>
      )
    })

    return (
      <Fragment>
        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle' id='create-donations-background'>
            <Segment stacked>
              <Table celled color='red' size='large'>
               <Table.Header>
                <Table.Row>
                  <Table.HeaderCell><Icon name='calendar' />Date</Table.HeaderCell>
                  <Table.HeaderCell><Icon name='info' />Description</Table.HeaderCell>
                  <Table.HeaderCell><Icon name='image' />Image</Table.HeaderCell>
                  <Table.HeaderCell><Icon name='heartbeat' />Status</Table.HeaderCell>
                  <Table.HeaderCell><Icon name='paper plane' />Destination</Table.HeaderCell>
                </Table.Row>
               </Table.Header>
                <Table.Body>
                  {donationDetail}
               </Table.Body>
              </Table>
            </Segment>
        </Grid>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  // debugger
  return {
    donations: state.donationsReducer
  }
}

const mapDispatchToProps = (dispatch) => {
  // debugger
  return {
    fetchDonations: () => dispatch(fetchDonations())
  }
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(withRouter(Donation)))
