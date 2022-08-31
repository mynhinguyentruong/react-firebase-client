import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from "@material-ui/icons/CalendarToday";


import { useSelector, useDispatch } from "react-redux";

import { Link as RouterLink} from 'react-router-dom';

import dayjs from "dayjs";

const useStyles = makeStyles({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%'
      }
    },
    '& .profile-image': {
      width: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      }
    },
    '& hr': {
      border: 'none',
      marginBottom: '10px'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px'
    }
  }
})

export default function Profile() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const { 
    authenticated, 
    credentials, //{ handle, createdAt, imageUrl, bio, website, location }, 
    loading }  = useSelector(state => state.user)
  

  // const handle = useSelector(state => {
  //   if (authenticated) return state.user.credentials.handle
  //   return null
  // })

  

  const profileMarkup = !loading ? 
  (authenticated ? (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img className="profile-image" src={credentials.imageUrl} alt="user profile"/>
        </div>
        <hr/>
        <div className="profile-details">
          <Link component={RouterLink} to={`/user/${credentials.handle}`} color='primary' variant='h5'>
            @{credentials.handle}
          </Link>
          <hr/>
          {credentials.bio && <Typography variant="body2">{credentials.bio}</Typography>}
          <hr/>
          {credentials.location && (
            <>
              <LocationOn color="primary"/><span>{credentials.location}</span>
              <hr/>
            </>
          )}
          {credentials.website && (
            <>
              <LinkIcon color="primary"/>
              <a href={credentials.website} target="_blank" rel="noopener noreferrer">
                {' '}{credentials.website}
              </a>
              <hr/>
            </>
          )}
          <CalendarToday color="primary"/>{' '}
          <span>Joined {dayjs(credentials.createdAt).format('MMM YYYY')}</span>
        </div>
      </div>
    </Paper>
  ) : (
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">No profile found, please log in again</Typography>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" component={RouterLink} to='/login'>Login</Button>
        <Button variant="contained" color="secondary" component={RouterLink} to='/signup'>Sign up</Button>
      </div>
    </Paper>
  )) : 
  (<p>Loading...</p>)

  return profileMarkup
}