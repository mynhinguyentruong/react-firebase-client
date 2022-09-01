import MyButton from "../utils/MyButton";
import LikeButton from "./LikeButton";
import makeStyles  from "@material-ui/styles/makeStyles";
// MUI 
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';

import { getOneScream } from "../redux/dataReducer";
import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import { useState } from "react";
import { Link } from 'react-router-dom';


const useStyles = makeStyles({
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    left: '90%'
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  }
})

export default function ScreamDialog({ body, createdAt, userImage, userHandle, commentCount, likeCount, screamId, likedScream, authenticated }) {
  const [isOpen, setIsOpen] = useState(false)
  const { isLoading } = useSelector(state => state.ui)
  const dispatch = useDispatch()
  const classes = useStyles()
  
  function handleOpen() {
    dispatch(getOneScream(screamId))
    setIsOpen(true)
  }

  function handleClose() {
    setIsOpen(false)
  }

  return (
    <>
    <MyButton
      onClick={handleOpen}
      tip="Expand scream"
    >
      <UnfoldMore color="primary" />
    </MyButton>
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <MyButton
        tip="Close"
        onClick={handleClose}
        tipClassName={classes.closeButton}
      >
        <CloseIcon />
      </MyButton>
      <DialogContent className={classes.dialogContent}>
        {isLoading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container>
        <Grid item sm={5}>
          <img src={userImage} alt="Profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton screamId={screamId} authenticated={authenticated} likedScream={likedScream} dispatch={dispatch} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        {/* <CommentForm screamId={screamId} />
        <Comments comments={comments} /> */}
      </Grid>)}
      </DialogContent>
    </Dialog>
    </>
  )
}