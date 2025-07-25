import type { MovieCardInfo } from '../../../_interfaces/interfaces'
import { imageBaseUrl } from '../../../_constants/constants'
import { Link } from 'react-router'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

const VoteText = ({ movieCardInfo }: { movieCardInfo: MovieCardInfo }) => {
  const voteAverage = Math.round(movieCardInfo["vote_average"] * 10) / 10
  const voteCount = `(${movieCardInfo["vote_count"]})`

  return (
    <Box className="flex gap-3">
      <Typography sx={{ fontWeight: 500}}>{voteAverage}</Typography>
      <Typography sx={{ color: "oklch(0.8 0 0)" }}>{voteCount}</Typography>
    </Box>
  )
}

const MovieCard = ({ movieCardInfo }: { movieCardInfo: MovieCardInfo }) => {
  const posterSrc = `${imageBaseUrl}${movieCardInfo.poster_path}`
  const [isMouseOver, setIsMouseOver] = useState(false)

  return (
    <Link to={`/detail/${movieCardInfo.id}`}
      className={`min-w-[200px] transition ${isMouseOver && "scale-110 z-10 -translate-y-[15px]"} h-[300px] overflow-hidden bg-zinc-800 flex flex-col items-start relative rounded-xl`}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}>

      <img src={posterSrc} alt={`${movieCardInfo.title}__poster`} className={`transition ${isMouseOver && "scale-105"} duration-500`} />

      <Box className={`transition absolute bottom-0 bg-zinc-800 ${isMouseOver ? "opacity-100" : "opacity-80"} px-3 py-1 w-full`}>
        <Typography sx={{
          textWrap: isMouseOver ? undefined : "nowrap",
          wordBreak: "keep-all",
          textOverflow: "ellipsis"
        }}>{movieCardInfo.title}</Typography>
        <VoteText movieCardInfo={movieCardInfo} />
      </Box>

    </Link>
  )
}

export default MovieCard