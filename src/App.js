import { Routes, Route, Navigate } from 'react-router-dom';

import PropTypes from 'prop-types'

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';

import jwtDecode from 'jwt-decode';

import { setAuthenticated, logoutUser, getUserData } from './redux/userReducer';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';



function App() {
  const dispatch = useDispatch()
  const { authenticated } = useSelector(state => state.user)
  
  const token = localStorage.FBIdToken;
  if(token) {
    const decoded = jwtDecode(token);
  if(decoded.exp*1000 < Date.now()) {
    dispatch(logoutUser())
    window.location.href = '/login'

  } else {
    dispatch(setAuthenticated())
    axios.defaults.headers.common['Authorization'] = token
    dispatch(getUserData())
  }
}



  return (
    <div className='container'>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/login' element={ authenticated ? <Navigate to='/' replace /> : <Login />} />
        <Route path='/signup' element={ authenticated ? <Navigate to='/' replace/> : <Signup />} />

      </Routes>
    </div>
  );
}

export default App;

App.propTypes = {
  authenticated: PropTypes.bool.isRequired
}