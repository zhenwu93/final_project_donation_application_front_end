const defaultState = {
  user:{},
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
    case 'EDIT_USER':
      // console.log('old user', state.user, action.payload);
      alert("Your changes have been saved. Redirecting you to your profile...")
      return {...state, user: action.payload }
    case 'FAILED_LOGIN':
      return {
        ...state,
        failedLogin: true,
        error: action.payload,
        authenticatingUser: false
      }
    case 'LOG_OUT':
      return {...state, loggedIn: false, authenticatingUser: false}
    default:
      return state
  }
}

export default usersReducer
