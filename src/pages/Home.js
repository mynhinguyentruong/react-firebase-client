import Grid from '@material-ui/core/Grid'

export default function Home() {
  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        <p>Content...</p>
      </Grid>
      <Grid item sm={4} xs={12} >
        <p>Profile...</p>
      </Grid>
    </Grid>
  )
}