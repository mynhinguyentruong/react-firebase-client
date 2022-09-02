import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import Scream from '../components/Scream';
import StaticProfile from '../components/StaticProfile';

import { getUserData } from '../redux/dataReducer';

export default function User() {
  const [profile, setProfile] = useState({})
  let { handle } = useParams()
  const dispatch = useDispatch()
  const { userScreams, loading } = useSelector(state => state.data)
  console.log(userScreams)
  console.log(profile)
  console.log(handle)

  const screamsMarkup = userScreams? userScreams.map(scream => <Scream key={scream.screamId} scream={scream} {...scream} />) : (<p>No screams from this user</p>)

  useEffect(() => {
    dispatch(getUserData(handle))
    axios
      .get(`/user/${handle}`)
      .then(res => setProfile(res.data))
      .catch(err => console.log(err))
  }, [handle])

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {loading ? (<p>Loading data...</p>): (screamsMarkup)}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile && <StaticProfile {...profile} />
        }
      </Grid>
    </Grid>
  )
}