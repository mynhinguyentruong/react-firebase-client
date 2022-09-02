// MUI Stuff
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { submitComment } from '../../redux/dataReducer';
import { setCommentError } from '../../redux/uiReducer';

import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';

export default function CommentForm({ authenticated, screamId }) {
  const [body, setBody] = useState('')
  const dispatch = useDispatch()
  const { errors } = useSelector(state => state.ui)

  function handleSubmit(e) {
    e.preventDefault()
    if (body.trim() !== '') {
      dispatch(submitComment(screamId, {body}))
      setBody('')
    } else dispatch(setCommentError())
  }


  return (
    authenticated && 
    <Grid item sm={12} style={{ textAlign: 'center' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on scream"
            error={errors?.comment && !body ? true : false}
            helperText={!body && errors?.comment}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{margin: '1rem'}}
          >
            Submit
          </Button>
        </form>
       
      </Grid>
  )
}