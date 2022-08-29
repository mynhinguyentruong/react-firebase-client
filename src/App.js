import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';

import jwtDecode from 'jwt-decode';

let authenticated;

const token = localStorage.FBIdToken;
if(token) {
  const decoded = jwtDecode(token);
  if(decoded.exp*1000 < Date.now()) {
    window.location.href = '/login'
    authenticated = false;
  } else authenticated = true
}

function App() {
  return (
    <div className='container'>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
    
      </Routes>
    </div>
  );
}

export default App;
