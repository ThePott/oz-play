import { Box, Button } from '@mui/material'
import CategoryTitle from './CategoryTitle'
import MovieCardGrid from './MovieCardGrid'
import useMovieStore from '../../../_store/store'
import { useBottomAppendation, useMovieDictGetCallback } from '../../../_hooks/hooks'

const SearchResultContainer = () => {
  // const movieCardInfoArray = useMovieStore((state) => state.movieArray)
  const movieDict = useMovieStore((state) => state.movieDict)
  const movieCardInfoArray = Object.values(movieDict)
  movieCardInfoArray.sort((a, b) => {
    if (a.page !== b.page) { return a.page - b.page }

    return b.popularity - a.popularity;
  })
  const { getMoreMovieDict } = useMovieDictGetCallback()
  // const { bottomRef } = useBottomAppendation()
  return (
    <Box className="h-full overflow-y-scroll overflow-x-hidden">
      <CategoryTitle text='영화 검색 결과' isLoading={false} />
      <MovieCardGrid movieCardInfoArray={movieCardInfoArray} isLoading={false} />
      {/* <Box ref={bottomRef} /> */}
      <Button onClick={getMoreMovieDict}>더 추가하기</Button>
    </Box>
  )
}

export default SearchResultContainer