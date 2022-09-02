import axios from "axios"

// Add and export action
export function loadingData() {
  return { type: "LOADING_DATA" }
}

export function getScreams() {
  return function(dispatch) {
    dispatch(loadingData())
    axios
      .get('/screams')
      .then(res => {
        dispatch({
          type: "SET_SCREAMS",
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: "SET_SCREAMS",
          payload: []
        })
      })
  }
}

export function getOneScream(screamId) {
  return function(dispatch) {
    dispatch({ type: "LOADING_UI" })
    axios
      .get(`/scream/${screamId}`)
      .then(res => {
        dispatch({
          type: "SET_SCREAM",
          payload: res.data
        })
        dispatch({ type: "STOP_LOADING_UI" })
      })
      .catch(err => console.log(err))
  }
}

export function postScream(newScream) {
  return function(dispatch) {
    dispatch({ type: "LOADING_UI" })
    axios
      .post('/scream', newScream)
      .then(res => {
        dispatch({
          type: "POST_SCREAM",
          payload: res.data
        })
        dispatch({ type: "CLEAR_ERRORS" });
      })
      .catch(err => dispatch({
        type: "SET_ERRORS",
        payload: err.response.data
      }))
  }
}

export function likeScream(screamId) {
  return function(dispatch) {
    axios
      .get(`/scream/${screamId}/like`)
      .then(res => dispatch({
        type: "LIKE_SCREAM",
        payload: res.data
      }))
      .catch(err => console.log(err))
  }
}

export function unlikeScream(screamId) {
  return function(dispatch) {
    axios
      .get(`/scream/${screamId}/unlike`)
      .then(res => dispatch({
        type: "UNLIKE_SCREAM",
        payload: res.data
      }))
      .catch(err => console.log(err))
  }
}

export function deleteScream(screamId) {
  return function(dispatch) {
    axios
      .delete(`/scream/${screamId}`)
      .then(() => dispatch({
        type: "DELETE_SCREAM",
        payload: screamId
      }))
  }
}

export function submitComment(screamId, commentData) {
  return function(dispatch) {
    axios
      .post(`/scream/${screamId}`, commentData)
      .then(res => {
        dispatch({
        type: "SUBMIT_COMMENT",
        payload: res.data
        })
        dispatch({type: "CLEAR_ERRORS"}) 
      })
      .catch(err => dispatch({
        type: "SET_ERRORS",
        payload: err.response.data
      }))
  }
}

export function getUserData(userHandle) {
  return function(dispatch) {
    dispatch(loadingData())
    axios
      .get(`/user/${userHandle}`)
      .then(res => dispatch({
        type: "SET_USER_SCREAMS",
        payload: res.data.screams
      }))
      .catch(() => dispatch({
        type: "SET_USER_SCREAMS",
        payload: null
      }))
  }
}

// export function clearErrors() {
//   return function(dispatch) {
//     dispatch({ type: "CLEAR_ERRORS" })
//   }
// }

const initialState = {
  screams: [],
  userScreams: [],
  scream: {},
  loading: false
}

export default function dataReducer(state = initialState, action) {
  switch(action.type) {
    case 'LOADING_DATA':
      return {
        ...state, loading: true
      }
    case 'SET_SCREAMS':
      return {
        ...state,
        screams: action.payload,
        loading: false
      }
    case 'SET_USER_SCREAMS':
      return {
        ...state,
        userScreams: action.payload,
        loading: false
      }
    case 'SET_SCREAM':
      return {
        ...state,
        scream: action.payload
      }
    case 'LIKE_SCREAM': 
      return {
        ...state,
        screams: state.screams.map(scream => scream.screamId === action.payload.screamId ? {...scream, likeCount: scream.likeCount + 1} : scream)
      }
    case 'UNLIKE_SCREAM':
      return {
        ...state,
        screams: state.screams.map(scream => scream.screamId === action.payload.screamId ? {...scream, likeCount: scream.likeCount - 1} : scream)
      }
    case 'DELETE_SCREAM':
      const newScreams = state.screams.filter(scream => scream.screamId !== action.payload)
      return {...state, screams: newScreams}
    case 'POST_SCREAM':
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      }
    case 'SUBMIT_COMMENT':
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        },
        screams: state.screams.map(scream => scream.screamId === action.payload.screamId ? {...scream, commentCount: scream.commentCount + 1} : scream)
      }
    default:
      return state
  }
}