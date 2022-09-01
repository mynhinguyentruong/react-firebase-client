import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { useState } from 'react'

import { useDispatch } from 'react-redux';
import { deleteScream } from '../redux/dataReducer';

export default function DeleteDialog({screamId}) {
  const [isOpen, setIsOpen] = useState(false)

  const dispatch = useDispatch()
  return (
    <div style={{ alignItems: "start", display: 'flex', margin: '20px 20px auto auto'}} >
    <Button
      onClick={() => setIsOpen(true)}
      color="primary"
      variant="contained"
      size='small'
      startIcon={<DeleteForeverIcon  />}
      
    >
      Delete
    </Button>
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        Are you sure you want to delete this scream ?
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={()=>dispatch(deleteScream(screamId))} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
    </div>
  )
}