import { Box } from "@mui/material"
import { useBottomAdd } from "../../../_hooks/hooks"
import useMovieStore from "../../../_store/store"
import { sortMovieDict } from "../../../_utils/utils"
import CategoryTitle from "./CategoryTitle"
import MovieCardGrid from "./MovieCardGrid"
import MovieSwiper from "./MovieSwiper"

const MainContainer = () => {
  const movieDict = useMovieStore((state) => state.movieDict)
  const movieArray = sortMovieDict(movieDict)

  const hotmovieArray = [...movieArray]
    .filter((movieCardInfo) => movieCardInfo.vote_count > 100)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10)

  const { bottomRef } = useBottomAdd()

  return (
    <Box
      sx={{ scrollbarColor: "oklch(0.5 0 0) transparent" }}
      className="h-full overflow-scroll">

      <CategoryTitle text="이번 주 인기작 TOP 10" />

      <MovieSwiper movieArray={hotmovieArray} />

      <CategoryTitle text="오직 오즈 플레이에서만" />

      <MovieCardGrid movieArray={movieArray} />

      <Box ref={bottomRef} />
    </Box>
  )
}

export default MainContainer