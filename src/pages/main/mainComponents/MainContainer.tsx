import { Box } from "@mui/material"
import { useMovieGet } from "../../../_hooks/hooks"
import type { MovieCardInfo } from "../../../_interfaces/interfaces"
import useMovieStore from "../../../_store/store"
import { filterOnlySafe } from "../../../_utils/utils"
import CategoryTitle from "./CategoryTitle"
import MovieCardGrid from "./MovieCardGrid"
import MovieSwiper from "./MovieSwiper"


const MainContainer = () => {
  // useMovieGet()
  // const testUrl = "https://api.themoviedb.org/3/search/movie?query=마인크래프트&include_adult=false&language=ko&page=1"
  // useTestGet(testUrl)
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

export default MainContainer