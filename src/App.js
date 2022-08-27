import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';

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
