import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import makeStyles  from "@material-ui/styles/makeStyles";

import { Link } from 'react-router-dom';

import { Fragment } from 'react';

const useStyles = makeStyles({
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: 20
  },
  invisibleSeparator: {
    border: 'none',
    margin: 4
  }
})

export default function Comments({comments, dayjs}) {

  const classes = useStyles()

  return (
    <Grid container>
      {comments?.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid container>
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variabnt="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            {index !== comments.length - 1 && (
              <hr/>
            )}
          </Fragment>
        );
      })}
    </Grid>
  )
}