import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AppIcon from '../images/monkey-icon.png'

// import PropTypes from 'prop-types';
import { useState } from 'react';

import { useNavigate } from "react-router-dom";

import { signupUser } from '../redux/userReducer';
import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles(() => ({
  root: {

  },
  image: {
    margin: '20px auto 20px auto'
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  button: {
    marginTop: '20px'
  }
}))

export default function Signup() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    handle: ''
  })

  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { errors } = useSelector(state => state.ui)
  const user = useSelector(state => state.user)


  const classes = useStyles();
  // console.log(classes)

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signupUser(form, navigate))
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prevValue => ({...prevValue, [name]: value}))
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" className={classes.root}>

        <img src={AppIcon} alt='logo' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Signup
        </Typography>
        <div style={{ maxWidth: 800, display: 'block', marginInline: 'auto' }}>
          <Box component="div">
          <form noValidate onSubmit={handleSubmit}>
            <TextField 
              id='email' 
              name='email' 
              type="email" 
              label="Email" 
              className={classes.textField} 
              error={errors.email ? true : false}
              helperText={errors.email}
              value={form.email}
              onChange={handleChange}
              fullWidth/>
            <TextField 
              id='password' 
              name='password' 
              type="password" 
              label="Password" 
              className={classes.textField} 
              error={errors.password ? true : false}
              helperText={errors.password}
              value={form.password}
              onChange={handleChange}
              fullWidth
              />
            <TextField 
              id='confirmPassword' 
              name='confirmPassword' 
              type="password" 
              label="Confirm Password" 
              className={classes.textField} 
              error={errors.confirmPassword ? true : false}
              helperText={errors.confirmPassword}
              value={form.confirmPassword}
              onChange={handleChange}
              fullWidth
              />
            <TextField 
              id='handle' 
              name='handle' 
              type="handle" 
              label="Handle" 
              className={classes.textField} 
              error={errors.handle ? true : false}
              helperText={errors.handle}
              value={form.handle}
              onChange={handleChange}
              fullWidth
              />
            <Button type='submit' variant="contained" color="primary" className={classes.button}>Sign up</Button>
          </form>
          </Box>
        </div>
    </Box>
  )
}

// Login.propTypes = {
//   classes: PropTypes.object.isRequired
// }