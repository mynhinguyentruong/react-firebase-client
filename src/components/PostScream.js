import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import PostAddIcon from '@material-ui/icons/PostAdd';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../utils/MyButton';
import { makeStyles } from '@material-ui/core/styles';

import { useState } from 'react';

import { postScream } from '../redux/dataReducer';
import { clearErrors } from '../redux/uiReducer';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles({
  submitButton: {
    position: 'relative',
    float: 'left',
    marginTop: 10
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '91%',
    top: '6%'
  }
})

export default function PostScream() {

  const [isOpen, setIsOpen] = useState(false)
  const [body, setBody] = useState('')

  const dispatch = useDispatch()
  const { errors, isLoading } = useSelector(state => state.ui)
  const classes = useStyles()

  function handleClose() {
    dispatch(clearErrors())
    setIsOpen(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(postScream({ body }))
    setBody('')
  }

  return (
    <>
    <MyButton onClick={() => setIsOpen(true)} tip="Post a Scream!">
      <PostAddIcon style={{ color: 'white' }} />
    </MyButton>
    <Dialog
      open={isOpen}
      onClose={()=>setIsOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <MyButton
        tip="Close"
        onClick={()=>setIsOpen(false)}
        tipClassName={classes.closeButton}
      >
        <CloseIcon />
      </MyButton>
      <DialogTitle>Post a new scream</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="SCREAM!!"
            multiline
            minRows="3"
            placeholder="What scream you would like to make today? 🤡"
            error={errors?.body ? true : false}
            helperText={errors?.body}
            onChange={(e)=>setBody(e.target.value)}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            className={classes.submitButton}
          >
            Submit
            {isLoading && (
              <CircularProgress
                size={30}
                className={classes.progressSpinner}
              />
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    </>
  )
}