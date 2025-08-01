import { Box, Skeleton } from '@mui/material'
import useMovieStore from '../../../_store/store'
import MovieCard from './MovieCard'

const MovieCardGrid = ({ movieArray }: { movieArray: any[] }) => {
  const isLoading = useMovieStore((state) => state.isLoading)

  const dummyArray = [...Array(50).keys()]
  if (isLoading) {
    return (
      <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 px-3">
        {dummyArray.map((_, index) => <Skeleton sx={{ borderRadius: "12px" }} key={index} variant='rectangular' height={300} />)}
      </Box>
    )
  }

  return (
    <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 px-3">
      {movieArray.map((movieCardInfo, index) => <MovieCard key={index} movieCardInfo={movieCardInfo} variant='NORMAL' />)}
    </Box>
  )
}

export default MovieCardGrid