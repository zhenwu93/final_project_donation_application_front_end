export const fetchDonations = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/donations`)
    .then(res => res.json())
    .then(json => {
      // debugger
      return dispatch({
        type: "FETCH_DONATIONS", payload: json
      })
    })
  }
}

export const createDonation = ({avatar, description}, history) => {
  return (dispatch) => {
    // dispatch({ type: "ADDING_DONATION" })
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/donations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        donation: {
          description: description,
          avatar: avatar
        }
      })
    })
      .then(res => res.json())
      .then(json => {
        // console.log('avatar: ', avatar);
        // console.log('description: ', description);
        // console.log('history: ', history);
        // debugger
        dispatch({ type: 'ADD_DONATION', payload: json })
        // dispatch({ type: "ADDED_DONATION" })
          // this.props.history.push('/donations')
        history.push('/donations')
      })
  }
}

// export const addDonation = (donationData) => ({
//   type:'ADD_DONATION',
//   payload: donationData
// })

// export const addingDonation = () => ({type: 'ADDING_DONATION'})
