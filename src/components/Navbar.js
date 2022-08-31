import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom"

import { useSelector } from 'react-redux';

export default function Navbar() {
  const dispatch = useDispatch()
  const { authenticated } = useSelector(state => state.user)

  return (
    <AppBar>
      <Toolbar className='center'>
        <Button color="inherit" component={Link} to='/'>Home</Button>
        <Button color="inherit" component={Link} to='/login'>Login</Button>
        <Button color="inherit" component={Link} to='/signup'>Signup</Button>
      </Toolbar>
    </AppBar>
  )
}