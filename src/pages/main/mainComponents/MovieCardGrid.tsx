import { Box, Skeleton } from '@mui/material'
// import type { MovieCardInfo } from '../../../_interfaces/interfaces'
import MovieCard from './MovieCard'
import { useBottomAppendation } from '../../../_hooks/hooks'

const MovieCardGrid = ({ movieCardInfoArray, isLoading }: { movieCardInfoArray: any[], isLoading: boolean }) => {
  // const { bottomRef } = useBottomAppendation()
  const dummyArray = [...Array(50).keys()]
  if (isLoading) {
    return (
      <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 px-3">
        {dummyArray.map((_, index) => <Skeleton sx={{borderRadius: "12px"}} key={index} variant='rectangular' height={300} />)}
      </Box>
    )
  }

  return (
    <Box className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-3 px-3">
      {movieCardInfoArray.map((movieCardInfo, index) => <MovieCard key={index} movieCardInfo={movieCardInfo} variant='NORMAL' />)}
      {/* <Box ref={bottomRef} /> */}
    </Box>
  )
}

export default MovieCardGrid