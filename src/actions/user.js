export const loginUser = (username, password) => {
  return (dispatch) => {
      // console.log(process.env.REACT_APP_API_ENDPOINT)
      dispatch({ type: 'AUTHENTICATING_USER' })

      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password
          }
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            throw res
          }
        })
        .then(JSONres => {
          // console.log('%c INSIDE YE OLDE .THEN', 'color: navy')
          localStorage.setItem('jwt', JSONres.jwt)
          // dispatch({ type: 'SET_CURRENT_USER', payload: JSONres.user })
          dispatch(setCurrentUser(JSONres.user))
        })
        .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))
  }
} //end of loginUser

export const fetchCurrentUser = () => {
  return (dispatch) => {
    dispatch(authenticatingUser())
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/profile`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
    .then(res => res.json())
    .then((JSONres) => dispatch(setCurrentUser(JSONres.user)))
  }
}// end of fetchCurrentUser

export const editUser = (id, first_name, last_name, address, phone_number, email, username, password_digest) => {
  return (dispatch) => {
    dispatch(editingUser())
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const editingUser = (userData) => ({
  type: 'EDIT_USER',
  payload: userData
})

export const authenticatingUser = () => ({ type: 'AUTHENTICATING_USER'})

export const failedLogin = (errorMsg) => ({
  type: 'FAILED_LOGIN',
  payload: errorMsg
})//end of failedLogin

export const logOut = () => {
  localStorage.removeItem('jwt')

  return {
    type: 'LOG_OUT',
    payload: ''
  }
}
