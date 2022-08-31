import Grid from '@material-ui/core/Grid'

import axios from 'axios'

import { useEffect, useState } from 'react'

import Scream from '../components/Scream'
import Profile from '../components/Profile'


export default function Home() {

  const [allScreams, setAllScreams] = useState(null)

  useEffect(() => {
    axios.get('/screams')
      .then(res => {
        console.log(res.data)
        setAllScreams(res.data)
      })
      .catch(err => console.log(err))
  }, [])

  let recentScreamsMarkup = allScreams?.map(scream => <Scream key={scream.screamId} {...scream} />)


  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup ? recentScreamsMarkup : 'Loading...'}
      </Grid>
      <Grid item sm={4} xs={12} >
        <Profile />
      </Grid>
    </Grid>
  )
}