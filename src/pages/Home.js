import Grid from '@material-ui/core/Grid'

import axios from 'axios'

import { useEffect, useState } from 'react'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from '../redux/dataReducer'
import { CircularProgress } from '@material-ui/core'

export default function Home() {

  const dispatch = useDispatch()
  const { screams, loading } = useSelector(state => state.data)

  useEffect(() => {
    dispatch(getScreams())
  }, [])

  let recentScreamsMarkup = screams?.map(scream => <Scream key={scream.screamId} {...scream} scream={scream} />)


  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {loading ? <CircularProgress size={200} thickness={2}/> : recentScreamsMarkup }
      </Grid>
      <Grid item sm={4} xs={12} >
        <Profile />
      </Grid>
    </Grid>
  )
}