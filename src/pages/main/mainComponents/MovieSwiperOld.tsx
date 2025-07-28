import { Box } from '@mui/material'
import type { MovieCardInfo } from '../../../_interfaces/interfaces'
import MovieCardHorizontal from './MovieCardHorizontal'

const MovieSwiper = ({ movieCardInfoArray }: { movieCardInfoArray: MovieCardInfo[] }) => {
  return (
    <Box sx={{ scrollbarWidth: "none" }} className="flex gap-12 overflow-scroll py-12">
      {movieCardInfoArray.map((movieCardInfo, index) => (
        <MovieCardHorizontal key={index} movieCardInfo={movieCardInfo} />
      ))}
    </Box>
  )
}

export default MovieSwiper