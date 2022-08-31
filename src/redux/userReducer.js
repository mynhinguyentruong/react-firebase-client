// Add and export action creator
import axios from "axios";

export function setAuthenticated() {
  return { type: "SET_AUTHENTICATED" }
}

export function setUnauthenticated() {
  return { type: "SET_UNAUTHENTICATED"}
}

export function loadUser() {
  return { type: "LOADING_USER"}
}

export function loginUser(userData, navigate) {
  return function(dispatch) {
    dispatch({ type: "LOADING_UI"})
    axios
      .post('/login', userData)
      .then(res => {
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData())
        dispatch({ type: "CLEAR_ERRORS "})
        navigate('/')
      })
      .catch(err => dispatch({
        type: "SET_ERRORS",
        payload: err.response.data
      }))
  }
}

export function signupUser(newUserData, navigate) {
  return function(dispatch) {
    dispatch({ type: "LOADING_UI" });
    axios
      .post('/signup', newUserData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: "CLEAR_ERRORS" });
        navigate('/');
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERRORS",
          payload: err.response.data
        });
      });
  };
} 

export function logoutUser() {
  return function(dispatch) {
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
    dispatch(setUnauthenticated())
  }
}

export function getUserData() {
  return function(dispatch) {
    dispatch(loadUser())
    axios
      .get('/user')
      .then(res => {
        dispatch({
          type: "SET_USER",
          payload: res.data
        })
      })
      .catch(err => console.log(err)) 
  }
  // {
  //   type: "SET_USER", 
  //   payload: responseFromAxios.data
  // }
}

export function uploadImage(formData) {
  return function(dispatch) {
    dispatch(loadUser())
    axios
      .post('/user/image', formData)
      .then(() => dispatch(getUserData()))
      .catch(err => console.log(err))
  }
}

export function editUserDetails(userDetails) {
  return function(dispatch) {
    dispatch(loadUser())
    axios
      .post('/user', userDetails)
      .then(() => dispatch(getUserData))
      .catch(err => console.log(err))
  }
}

export function markNotificationsRead(notificationIds) {
  return function(dispatch) {
    axios
      .post('/notifications', notificationIds)
      .then(() => dispatch({ type: "MARK_NOTIFICATION_READ"}))
      .catch(err => console.log(err))
  }
}


const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: []
}

export default function userReducer(state = initialState, action) {
  switch(action.type) {
    case 'SET_AUTHENTICATED':
      return {
        ...state,
        authenticated: true
      };
    case 'SET_UNAUTHENTICATED':
      return initialState;
    case 'SET_USER':
      return {
        authenticated: true,
        loading: false,
        ...action.payload
      };
    case 'LOADING_USER':
      return {
        ...state,
        loading: true
      };
    case 'LIKE_SCREAM':
      return {
        ...state,
        likes: [...state.likes, 
          {
            userHandle: state.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case 'UNLIKE_SCREAM':
      return {
        ...state,
        likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
      };
    case "MARK_NOTIFICATION_READ":
      state.notifications.forEach(not => not.read = true)
      return {...state};
    default:
      return state
  }
}

function setAuthorizationHeader(token) {
  const FBIdToken = `Bearer ${token}`
  localStorage.setItem('FBIdToken', FBIdToken)
  axios.defaults.headers.common['Authorization'] = FBIdToken
}
