import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import MyButton from '../utils/MyButton';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';

import PostScream from './PostScream';

import { Link } from "react-router-dom"

import { useSelector } from 'react-redux';

export default function Navbar() {
  const { authenticated } = useSelector(state => state.user)
  
  return (
    <AppBar>
      <Toolbar className='center'>
        {authenticated ? 
        (
        <>
          <PostScream />
          <Button color="primary" component={Link} to='/' ><MyButton tip='Home' placement='bottom'><HomeIcon style={{ color: 'white' }}/></MyButton>
          </Button>
          <Button color="primary" component={Link} to='/' ><MyButton tip='Home' placement='bottom'><NotificationsIcon style={{ color: 'white' }}/></MyButton>
          </Button>
        </>
        ) :
        (
        <>
          <Button color="inherit" component={Link} to='/'>Home</Button>
          <Button color="inherit" component={Link} to='/login'>Login</Button>
          <Button color="inherit" component={Link} to='/signup'>Signup</Button>
        </>)}
      </Toolbar>
    </AppBar>
  )
}