import { useState } from 'react'

import { editUserDetails } from '../redux/userReducer'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
// Icons
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles({

})

export default function EditDetails() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()
  const { credentials } = useSelector(state => state.user)



  return (
    <>
      <Tooltip title="Edit details" placement='top'>
        <IconButton onClick={() => setIsOpen(true)}>
          <EditIcon color='primary'/>
        </IconButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullWidth
        maxWidth="sm">
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField 
                name='bio' 
                type='text' 
                label="Bio" 
                multiline 
                rows="3" 
                placeholder='A short bio about yourseulf'
                onChange={handleChange}/>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} color='primary'>Cancel</Button>
            <Button color='primary' onClick={handleSubmit}>Save</Button>
          </DialogActions>
      </Dialog>
    </>
  )
}