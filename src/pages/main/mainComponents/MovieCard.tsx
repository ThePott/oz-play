import { imageBaseUrl } from '../../../_constants/constants'
import { Link } from 'react-router'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'
import { colorStyle } from '../../../_constants/colorConstants'
import HeartButton from '../../../components/HeartButton'

const VoteText = ({ movieCardInfo }: { movieCardInfo: any }) => {
  const voteAverage = Math.round(movieCardInfo["vote_average"] * 10) / 10
  const voteCount = `(${movieCardInfo["vote_count"]})`

  return (
    <Box className="flex gap-3">
      <Typography sx={{ fontWeight: 500 }}>{voteAverage}</Typography>
      <Typography sx={{ color: "oklch(0.8 0 0)" }}>{voteCount}</Typography>
    </Box>
  )
}

const MovieCard = ({ movieCardInfo, variant }: { movieCardInfo: any, variant: "NORMAL" | "BIG" }) => {
  const posterSrc = `${imageBaseUrl}${movieCardInfo.poster_path}`
  const [isMouseOver, setIsMouseOver] = useState(false)

  const linkBaseStyle = `transition overflow-hidden bg-zinc-800 flex flex-col items-start relative rounded-xl`
  const linkNormalStyle = `min-w-[200px] h-[300px] ${isMouseOver && "scale-110 z-10 -translate-y-[15px]"}`
  const linkBigStyle = `w-[400px] shrink-0 h-[600px]`
  const linkVariantStyle = `${linkBaseStyle} ${variant === "NORMAL" ? linkNormalStyle : linkBigStyle}`

  return (
    <Link to={`/detail/${movieCardInfo.id}`}
      className={linkVariantStyle}
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}>
        
      {isMouseOver && <HeartButton movieId={movieCardInfo.id} />}

      <img src={posterSrc} alt={`${movieCardInfo.title}__poster`} className={`transition ${isMouseOver && "scale-105"} duration-500`} />

      <Box className={`transition absolute bottom-0 ${colorStyle.bgFront} ${isMouseOver ? "opacity-100" : "opacity-80"} px-3 py-1 w-full`}>
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