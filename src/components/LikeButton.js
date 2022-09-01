import MyButton from "../utils/MyButton"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { unlikeScream, likeScream } from "../redux/dataReducer";

import { useNavigate } from "react-router-dom";

export default function LikeButton({ likedScream, authenticated, screamId, dispatch }) {
  const navigate = useNavigate()

  function setLikeScream() {
    console.log('clicked')
    if (!authenticated) {
      console.log('not authenticated')
      navigate("/login", { replace: true })
    }
    else dispatch(likeScream(screamId))
  }

  function setUnlikeScream() {
    dispatch(unlikeScream(screamId))
  }

  return (
    (likedScream && authenticated) ? 
      <MyButton tip="Like" onClick={setUnlikeScream}>
        <FavoriteIcon color="primary" />
      </MyButton> : 
      <MyButton tip="Like" onClick={setLikeScream}>
        <FavoriteBorderIcon color="primary" />
      </MyButton>
  )
}