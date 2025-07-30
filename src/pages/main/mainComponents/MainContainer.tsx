import { Box, Button } from "@mui/material"
import { useEffect, useRef } from "react"
// import type { MovieCardInfo } from "../../../_interfaces/interfaces"
// import { getMovieALot } from "../../../_services/tmdbServices"
import useMovieStore from "../../../_store/store"
import CategoryTitle from "./CategoryTitle"
import MovieCardGrid from "./MovieCardGrid"
import MovieSwiper from "./MovieSwiper"
import { useBottomAppendation, useMovieDictGetCallback } from "../../../_hooks/hooks"
import { useSearchParams } from "react-router"




const MainContainer = () => {
  // const { bottomRef } = useBottomAppendation()
  const { getMoreMovieDict } = useMovieDictGetCallback()
  // const movieCardInfoArray: MovieCardInfo[] = useMovieStore((state) => state.movieArray)
  // const safeMovieCardInfo = filterOnlySafe(movieCardInfoArray)
  const movieDict = useMovieStore((state) => state.movieDict)
  const movieCardInfoArray = Object.values(movieDict)
  movieCardInfoArray.sort((a, b) => {
    if (a.page !== b.page) { return a.page - b.page }

    return b.popularity - a.popularity;
  })
  const isLoading = movieCardInfoArray.length === 0

  const hotMovieCardInfoArray = [...movieCardInfoArray]
    .filter((movieCardInfo) => movieCardInfo.vote_count > 100)
    .sort((a, b) => b.vote_average - a.vote_average)
    .slice(0, 10)

  const page = useMovieStore((state) => state.page)
  const appendMovieArray = useMovieStore((state) => state.appendMovieArray)
  const increasePage = useMovieStore((state) => state.increasePage)

  const [searchParams, _setSearchParams] = useSearchParams()

  const query = searchParams.get("title") ?? ""

  return (
    <Box
      sx={{ scrollbarColor: "oklch(0.5 0 0) transparent" }}
      className="h-full overflow-scroll">

      <CategoryTitle text="이번 주 인기작 TOP 10" isLoading={isLoading} />

      <MovieSwiper movieCardInfoArray={hotMovieCardInfoArray} isLoading={isLoading} />

      <CategoryTitle text="오직 오즈 플레이에서만" isLoading={isLoading} />

      <MovieCardGrid movieCardInfoArray={movieCardInfoArray} isLoading={isLoading} />

      <Button onClick={getMoreMovieDict}>더보기</Button>
      {/* <Box ref={bottomRef} /> */}
    </Box>
  )
}

export default MainContainer