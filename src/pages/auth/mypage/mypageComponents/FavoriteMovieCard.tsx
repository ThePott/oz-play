import MovieCard from "../../../main/mainComponents/MovieCard"


const FavoriteMovieCard = ({ favoriteDetail }: { favoriteDetail: any }) => {
  const movieCardInfo = {
    poster_path: "",
    id: "",
    title: "",
  }


  return (
    <MovieCard movieCardInfo={movieCardInfo} variant="NORMAL" />
  )
}

export default FavoriteMovieCard