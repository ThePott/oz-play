import { Box } from "@mui/material"
import type { MovieCardInfo } from "../../_interfaces/interfaces"
import movieListData from "../../assets/data/movieListData.json"
import MovieCard from "./mainComponents/MovieCard"
import MovieSwiper from "./mainComponents/MovieSwiper"

const MainPage = () => {
  const movieCardInfoArray: MovieCardInfo[] = movieListData.results

  const hotMovieCardInfoArray = movieCardInfoArray.filter((movieCardInfo) => movieCardInfo.vote_average >= 7)
  hotMovieCardInfoArray.sort((a, b) => b.vote_average - a.vote_average)



  return (
    <Box sx={{ scrollbarColor: "oklch(0.5 0 0) transparent" }} 
    className="h-full overflow-scroll">
      <MovieSwiper movieCardInfoArray={hotMovieCardInfoArray} />
      <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 ">
        {movieCardInfoArray.map((movieCardInfo, index) => <MovieCard key={index} movieCardInfo={movieCardInfo} />)}
      </Box>
    </Box>
  )
}

export default MainPage