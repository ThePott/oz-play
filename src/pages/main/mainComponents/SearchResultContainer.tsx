import { Box } from '@mui/material'
import CategoryTitle from './CategoryTitle'
import MovieCardGrid from './MovieCardGrid'
import useMovieStore from '../../../_store/store'

const SearchResultContainer = () => {
  const movieCardInfoArray = useMovieStore((state) => state.movieArray)
  return (
    <Box>
        <CategoryTitle text='영화 검색 결과' isLoading={false} />
        <MovieCardGrid movieCardInfoArray={movieCardInfoArray} isLoading={false} />
    </Box>
  )
}

export default SearchResultContainer