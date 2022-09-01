// Add and export action
export function clearErrors() {
  return { type: "CLEAR_ERRORS"}
}

export function setBodyError() {
  return { type: "SET_BODY_ERRORS"}
}

const initialState = {
  isLoading: false,
  errors: {}
}

export default function uiReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_ERRORS':
      return {
        ...state,
        isLoading: false,
        errors: action.payload
      } 
    case 'SET_BODY_ERRORS':
      return {
        ...state,
        isLoading: false,
        errors: {...state.errors, body: "Come on! Your scream cannot be empty!"}
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        isLoading: false,
        errors: {}
      }
    case 'LOADING_UI':
      return {
        ...state,
        isLoading: true
      }
    case 'STOP_LOADING_UI':
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  }
}
