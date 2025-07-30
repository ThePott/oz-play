import { Box } from '@mui/material'
import CategoryTitle from './CategoryTitle'
import MovieCardGrid from './MovieCardGrid'
import useMovieStore from '../../../_store/store'
import { useBottomAppendation } from '../../../_hooks/hooks'

const SearchResultContainer = () => {
  const movieCardInfoArray = useMovieStore((state) => state.movieArray)
  const { bottomRef } = useBottomAppendation()
  return (
    <Box className="h-full overflow-y-scroll overflow-x-hidden">
      <CategoryTitle text='영화 검색 결과' isLoading={false} />
      <MovieCardGrid movieCardInfoArray={movieCardInfoArray} isLoading={false} />
      <Box ref={bottomRef} />
    </Box>
  )
}

export default SearchResultContainer