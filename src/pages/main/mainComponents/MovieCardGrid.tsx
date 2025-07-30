import { Box, Button, Skeleton } from '@mui/material'
import MovieCard from './MovieCard'
import { useBottomAdd, useMovieDictAdd } from '../../../_hooks/hooks'

const MovieCardGrid = ({ movieArray, isLoading }: { movieArray: any[], isLoading: boolean }) => {
  const { getMoreMovieDict } = useMovieDictAdd()
  const { bottomRef } = useBottomAdd()

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
      <Button onClick={getMoreMovieDict}>더보기</Button>
      <Box ref={bottomRef} className="w-[100px] h-[100px] bg-amber-300" />
    </Box>
  )
}

export default MovieCardGrid