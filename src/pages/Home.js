import Grid from '@material-ui/core/Grid'


import { useEffect } from 'react'

import Scream from '../components/Scream'
import Profile from '../components/Profile'

import { useSelector, useDispatch } from 'react-redux';
import { getScreams } from '../redux/dataReducer'
import { CircularProgress } from '@material-ui/core'

export default function Home() {

  const dispatch = useDispatch()
  const { screams, loading } = useSelector(state => state.data)
  const { credentials: {imageUrl} } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(getScreams())
  }, [imageUrl])

  let recentScreamsMarkup = screams?.map(scream => <Scream key={scream.screamId} {...scream} scream={scream} />)


  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {loading ? <CircularProgress size={200} thickness={2}/> : recentScreamsMarkup }
      </Grid>
      <Grid item sm={4} xs={12} style={{marginTop: '10px'}}>
        <Profile />
      </Grid>
    </Grid>
  )
}