const defaultState = {
  donations: [],
  // addingDonation: false
}

const donationsReducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'FETCH_DONATIONS':
      // debugger
      return {...state, donations: action.payload }
    case 'ADD_DONATION':
      alert("Your donation has been added. UR A GOOD PERSON!")
      return {...state, donations: [...state.donations, action.payload] }
    // case 'ADDING_DONATION':
    //   debugger
    //   return { ...state, addingDonation:true}
    // case 'ADDED_DONATION':
    //   debugger
    //   return { ...state, addingDonation:false}
    default:
      return state;
  }
}

export default donationsReducer
