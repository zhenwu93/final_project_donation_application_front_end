import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchDonations } from '../actions/donation.js'
import { Image, Table } from 'semantic-ui-react'
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

      return (
        <Table.Row key={donation.id}>
         <Table.Cell textAlign='center'>{formattedDate}</Table.Cell>
         <Table.Cell textAlign='center'>{donation.description}</Table.Cell>
         <Table.Cell><Image src={donation.avatar} size='small' bordered /></Table.Cell>
         <Table.Cell>{donation.status}</Table.Cell>
         <Table.Cell>{donation.status === 'delivered' ? donation.destination : 'pending' }</Table.Cell>
        </Table.Row>
      )
    })

    return (
      <Fragment>
          <Table celled >
            <Table.Header>
              <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Image</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Destination</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {donationDetail}
           </Table.Body>
          </Table>
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
