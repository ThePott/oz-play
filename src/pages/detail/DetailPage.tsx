import movieDetailData from "../../assets/data/movieDetailData.json"

import { imageBaseUrl } from '../../_constants/constants'


import { Box, Button, Typography } from '@mui/material'

const GenreChip = ({ id, name }: { id: number, name: string }) => {
  return (
    <Button sx={{ fontWeight: 600, color: "oklch(0.9 0 0)", borderColor: "oklch(0.6 0 0)" }} variant='outlined' className="p-3 bg-zinc-800 shrink-0">{name}</Button>
  )
}

const DetailPage = () => {
  const collectionPosterUrl = `${imageBaseUrl}${movieDetailData["belongs_to_collection"]["poster_path"]}`
  const genreArray = movieDetailData["genres"]

  const voteAverage = Math.round(movieDetailData["vote_average"] * 10) / 10
  const voteInfo = `⭐️ ${voteAverage}(${movieDetailData["vote_count"]})`
  return (
    <Box className="grid grid-cols-2 gap-12 flex-1 h-full overflow-hidden">

      <Box className="flex overflow-hidden relative">
        <img src={collectionPosterUrl} className='w-full blur-2xl absolute -z-10 opacity-60' />
        <img src={collectionPosterUrl} style={{objectFit: "contain"}} className='mx-auto h-full' />
      </Box>

      <Box className='flex flex-col gap-6 max-w-[750px] w-full'>
        <Box>
          <Typography sx={{ fontSize: "48px", fontWeight: 600 }}>{movieDetailData["title"]}</Typography>
          <Typography>{voteInfo}</Typography>
        </Box>
        <Box className="flex gap-3 flex-wrap w-full">
          {genreArray.map((genre, index) => <GenreChip key={index} {...genre} />)}
        </Box>
        <Typography>{movieDetailData["overview"]}</Typography>
      </Box>

    </Box>
  )
}

export default DetailPage