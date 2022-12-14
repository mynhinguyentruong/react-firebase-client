import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import User from './pages/User';

import jwtDecode from 'jwt-decode';

import { setAuthenticated, logoutUser, getUserData } from './redux/userReducer';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

axios.defaults.baseURL = "https://us-central1-socialape-417c5.cloudfunctions.net/api"

function App() {
  const dispatch = useDispatch()
  const { authenticated } = useSelector(state => state.user)
  const navigate = useNavigate()

  const token = localStorage.FBIdToken;
  if(token) {
    const decoded = jwtDecode(token);
  if(decoded.exp*1000 < Date.now()) {
    dispatch(logoutUser())
    navigate('/login')
  }}
  // } else {
  //   dispatch(setAuthenticated())
  //   axios.defaults.headers.common['Authorization'] = token
  //   dispatch(getUserData())
  // }

  return (
    <div className='container'>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/login' element={ authenticated ? <Navigate to='/' replace /> : <Login />} />
        <Route path='/signup' element={ authenticated ? <Navigate to='/' replace/> : <Signup />} />
        <Route path='/users/:handle' element={<User/>}/>
      </Routes>
    </div>
  );
}

export default App;
