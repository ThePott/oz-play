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

  const { bottomRef } = useBottomAdd()

  return (
    <Box
      sx={{ scrollbarColor: "oklch(0.5 0 0) transparent" }}
      className="h-full overflow-y-scroll overflow-x-hidden">

      <CategoryTitle text="오늘의 화제작 TOP 20" />

      <MovieSwiper  />

      <CategoryTitle text="오직 오즈 플레이에서만" />

      <div className="px-3">
        <MovieCardGrid movieArray={movieArray} />
      </div>

      <Box ref={bottomRef} />
    </Box>
  )
}

export default MainContainer