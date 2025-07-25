import { Box } from "@mui/material"
import { useMovieGet, useTestGet } from "../../_hooks/hooks"
import type { MovieCardInfo } from "../../_interfaces/interfaces"
import CategoryTitle from "./mainComponents/CategoryTitle"
import MovieCardGrid from "./mainComponents/MovieCardGrid"
import MovieSwiper from "./mainComponents/MovieSwiper"
import useMovieStore from "../../_store/store"


const MainPage = () => {
  useMovieGet()
  const testUrl = "https://api.themoviedb.org/3/configuration/languages"
  useTestGet(testUrl)
  // const movieCardInfoArray: MovieCardInfo[] = []
  const movieCardInfoArray: MovieCardInfo[] = useMovieStore((state) => state.movieArray)

  const isLoading = movieCardInfoArray.length === 0

  const hotMovieCardInfoArray = [...movieCardInfoArray]
  hotMovieCardInfoArray.sort((a, b) => b.vote_average - a.vote_average)
  hotMovieCardInfoArray.splice(10)

  return (
    <Box sx={{ scrollbarColor: "oklch(0.5 0 0) transparent" }}
      className="h-full overflow-scroll">

      <CategoryTitle text="이번 주 인기작 TOP 10" isLoading={isLoading} />

      <MovieSwiper movieCardInfoArray={hotMovieCardInfoArray} isLoading={isLoading} />

      <CategoryTitle text="오직 오즈 플레이에서만" isLoading={isLoading} />

      <MovieCardGrid movieCardInfoArray={movieCardInfoArray} isLoading={isLoading} />
      {/* <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 px-3">
        {movieCardInfoArray.map((movieCardInfo, index) => <MovieCard key={index} movieCardInfo={movieCardInfo} />)}
      </Box> */}
    </Box>
  )
}

export default MainPage