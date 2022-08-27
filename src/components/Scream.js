import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import makeStyles  from "@material-ui/styles/makeStyles";

import { Link } from 'react-router-dom';

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    margin: 10
  },
  cover: {
    width: 151,
  }
}))

function Scream({  body, createdAt, userImage, userHandle, commentCount, likeCount }) {

  const classes = useStyles();

  dayjs.extend(relativeTime);

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
        >{userHandle}</Typography>
        <Typography variant="body2" color="textSecondary" >{dayjs(createdAt).fromNow()}</Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  )
}

export default Scream;