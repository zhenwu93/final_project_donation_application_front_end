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

export const signupUser = ({first_name, last_name, address, phone_number, email, username, password}, history) => {
  return (dispatch) => {
    dispatch({ type: 'AUTHENTICATING_USER' })
      // debugger
      fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          user: {
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            address: address,
            phone_number: phone_number,
            email: email
          }
        })
      })
        .then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw response
            }
        })
          .then(JSONResponse => {
            localStorage.setItem('jwt', JSONResponse.jwt)
            dispatch(setCurrentUser(JSONResponse.user))
          })
          .catch(r => r.json().then(e => dispatch({ type: 'FAILED_LOGIN', payload: e.message })))

    }
  }

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

export const editUser = ({first_name, last_name, address, phone_number, email, username, password, id}, history) => {
  return (dispatch) => {
    // debugger
    // console.log('editUser', id, first_name, last_name, address, phone_number, email, username, password);
    // console.log(history);
    // console.log('the json', JSON.stringify({
    //   user: {
    //     id: id,
    //     first_name: first_name,
    //     last_name: last_name,
    //     address: address,
    //     phone_number: phone_number,
    //     email: email,
    //     username: username,
    //     password: password
    //   }
    // }));
    // dispatch(editingUser({
    //   first_name: first_name,
    //   last_name: last_name,
    //   address: address,
    //   phone_number: phone_number,
    //   email: email,
    //   username: username,
    //   password: password,
    //   id: id
    // }))

    // console.log(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${id}`);

    fetch(`${process.env.REACT_APP_API_ENDPOINT}/api/v1/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        user: {
          first_name: first_name,
          last_name: last_name,
          address: address,
          phone_number: phone_number,
          email: email,
          username: username,
          password: password
        }
      })
    })
      .then(res => {
        // console.log('dead');
        if (res.ok) {
          return res.json()
        } else {
          throw res
        }
      })
      .then(JSONres => {
          // console.log('%c INSIDE YE OLDE .THEN', 'color: navy', JSONres)
          dispatch({ type: 'EDIT_USER', payload: JSONres })
          history.push('/profile')
      })
  }
}

export const setCurrentUser = (userData) => ({
  type: 'SET_CURRENT_USER',
  payload: userData
})

export const editingUser = (userData, history) => ({
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
