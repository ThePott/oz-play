import { Box, Skeleton } from "@mui/material"
import { useMovieGet, useTestGet } from "../../_hooks/hooks"
import type { MovieCardInfo } from "../../_interfaces/interfaces"
import CategoryTitle from "./mainComponents/CategoryTitle"
import MovieCardGrid from "./mainComponents/MovieCardGrid"
import MovieSwiper from "./mainComponents/MovieSwiper"
import useMovieStore from "../../_store/store"
import { filterOnlySafe } from "../../_utils/utils"


const MainPage = () => {
  useMovieGet()
  const testUrl = "https://api.themoviedb.org/3/certification/movie/list"
  useTestGet(testUrl)
  // const movieCardInfoArray: MovieCardInfo[] = []
  const movieCardInfoArray: MovieCardInfo[] = useMovieStore((state) => state.movieArray)
  const safeMovieCardInfo = filterOnlySafe(movieCardInfoArray)


  const isLoading = safeMovieCardInfo.length === 0


  const hotMovieCardInfoArray = [...safeMovieCardInfo]
    .filter((movieCardInfo) => movieCardInfo.vote_count > 100)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10)

  return (
    <Box sx={{ scrollbarColor: "oklch(0.5 0 0) transparent" }}
      className="h-full overflow-scroll">

      <CategoryTitle text="이번 주 인기작 TOP 10" isLoading={isLoading} />

      <MovieSwiper movieCardInfoArray={hotMovieCardInfoArray} isLoading={isLoading} />

      <CategoryTitle text="오직 오즈 플레이에서만" isLoading={isLoading} />

      <MovieCardGrid movieCardInfoArray={safeMovieCardInfo} isLoading={isLoading} />
    </Box>
  )
}

export default MainPage