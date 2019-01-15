const defaultState = {
  user:null,
  loggedIn: false,
  authenticatingUser: false,
  failedLogin: false,
  error: null
}

const usersReducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER': //logs in and sets user
      return {...state, user: action.payload, loggedIn: true, authenticatingUser: false}
    case 'AUTHENTICATING_USER': //authenticates user
      return {...state, authenticatingUser: true}
    case 'AUTHENTICATED_USER': //change state back to false after authenticating
      return {...state, authenticatingUser: false}
    case 'EDIT_CURRENT_USER': 
      return {...state, user: action.payload, loggedIn: true, authenticatingUser: false}
    case 'LOG_OUT':
      return {...state, loggedIn: false, authenticatingUser: false}
    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    default:
    return state
  }
}

export default usersReducer
