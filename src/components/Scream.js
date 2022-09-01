import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import makeStyles  from "@material-ui/styles/makeStyles";
//MUI ICON
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import MyButton from "../utils/MyButton";
import { unlikeScream, likeScream } from "../redux/dataReducer";

import DeleteDialog from "./DeleteDialog";
import ScreamDialog from './ScreamDialog'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    margin: 10
  },
  cover: {
    width: 151,
  }
})

function Scream({  body, createdAt, userImage, userHandle, commentCount, likeCount, screamId, scream }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const classes = useStyles();
  dayjs.extend(relativeTime);

  const { authenticated, likes, credentials } = useSelector(state => state.user)
  const likedScream = likes?.find(like => like.screamId === screamId)

  const isOwner = credentials.handle && credentials.handle === userHandle

  function setLikeScream() {
    console.log('clicked')
    if (!authenticated) {
      console.log('not authenticated')
      navigate("/login", { replace: true })
    }
    else dispatch(likeScream(screamId))
  }

  function setUnlikeScream() {
    dispatch(unlikeScream(screamId))
  }

  return (
    <Card className={classes.root}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.cover}
        component="img"
      />
      <CardContent >
        <Typography 
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color='primary'
        >
          {userHandle}
        </Typography>
        
        <Typography variant="body2" color="textSecondary" >{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
        {likedScream && authenticated ? 
          <MyButton tip="Like" onClick={setUnlikeScream}>
            <FavoriteIcon color="primary" />
          </MyButton> : 
          <MyButton tip="Like" onClick={setLikeScream}>
            <FavoriteBorderIcon color="primary" />
          </MyButton>}
        <span>{likeCount} Likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary"/>
        </MyButton>
        <span>{commentCount} Comments</span>
        <ScreamDialog {...scream} />
      </CardContent>
      {isOwner && <DeleteDialog  />}
    </Card>
  )
}

export default Scream;