import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import AppIcon from '../images/monkey-icon.png'

import PropTypes from 'prop-types';
import { useState } from 'react';

import axios from 'axios';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles({
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
})

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  // console.log(form)
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  let navigate = useNavigate();
  


  const classes = useStyles()
  // console.log(classes)

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)
    axios.post('/login', form)
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`)
        setIsLoading(true)
        navigate('/')
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data)
        setIsLoading(false)
      })
  }

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prevValue => ({...prevValue, [name]: value}))
  }

  return (
    <Box display="flex" flexDirection="column" justifyContent="center" className={classes.root}>

        <img src={AppIcon} alt='logo' className={classes.image} />
        <Typography variant='h2' className={classes.pageTitle}>
          Login
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
            error={error.email ? true : false}
            helperText={error.email}
            value={form.email}
            onChange={handleChange}
            fullWidth/>
          <TextField 
            id='password' 
            name='password' 
            type="password" 
            label="Password" 
            className={classes.textField} 
            error={error.password ? true : false}
            helperText={error.password}
            value={form.password}
            onChange={handleChange}
            fullWidth
            />
          <Button type='submit' variant="contained" color="primary" className={classes.button}>Login</Button>
        </form>
        </Box>
        </div>
    </Box>
  )
}

// Login.propTypes = {
//   classes: PropTypes.object.isRequired
// }