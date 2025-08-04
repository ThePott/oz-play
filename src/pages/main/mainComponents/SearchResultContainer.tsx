import { Box } from '@mui/material'
import useMovieStore from '../../../_store/store'
import { sortMovieDict } from '../../../_utils/utils'
import CategoryTitle from './CategoryTitle'
import MovieCardGrid from './MovieCardGrid'
import { useBottomAdd } from '../../../_hooks/hooks'

const SearchResultContainer = () => {
  const movieDict = useMovieStore((state) => state.movieDict)

  const movieArray = sortMovieDict(movieDict)

  const { bottomRef } = useBottomAdd()

  return (
    <Box className="h-full overflow-y-scroll overflow-x-hidden">

      <CategoryTitle text='영화 검색 결과' />
      <MovieCardGrid movieArray={movieArray} />

      <Box ref={bottomRef} />
    </Box>
  )
}

export default SearchResultContainer