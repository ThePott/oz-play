import { imageBaseUrl } from '../../_constants/constants'
import { Box, Button, Typography } from '@mui/material'
import { useSelectedMovieGet } from "../../_hooks/hooks"
import { useParams } from "react-router"
import useMovieStore from "../../_store/store"
import { useEffect } from 'react'

const GenreChip = ({ id, name }: { id: number, name: string }) => {
  return (
    <Button sx={{ fontWeight: 600, color: "oklch(0.9 0 0)", borderColor: "oklch(0.6 0 0)" }} variant='outlined' className="p-3 bg-zinc-800 shrink-0">{name}</Button>
  )
}

const DetailPage = () => {
  const params = useParams()
  const movieId = Number(params.movieId)
  const selectedMovie = useMovieStore((state) => state.selectedMovie)
  const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie)
  useSelectedMovieGet(movieId)

  useEffect(
    () => {
      return () => setSelectedMovie(null)
    },
    []
  )

  if (!selectedMovie) { return null }
  console.log("---- selected movie:", selectedMovie)

  const posterUrl = `${imageBaseUrl}${selectedMovie.poster_path}`
  const genreArray = selectedMovie["genres"]

  const voteAverage = Math.round(selectedMovie["vote_average"] * 10) / 10
  const voteInfo = `⭐️ ${voteAverage}(${selectedMovie["vote_count"]})`
  return (
    <Box className="grid grid-cols-2 gap-12 flex-1 h-full overflow-hidden px-3">

      <Box className="flex overflow-hidden relative">
        <img src={posterUrl} className='w-full blur-2xl absolute -z-10 opacity-60' />
        <img src={posterUrl} style={{objectFit: "contain"}} className='mx-auto h-full' />
      </Box>

      <Box className='flex flex-col gap-6 max-w-[750px] w-full'>
        <Box>
          <Typography sx={{ fontSize: "48px", fontWeight: 600 }}>{selectedMovie["title"]}</Typography>
          <Typography>{voteInfo}</Typography>
        </Box>
        <Box className="flex gap-3 flex-wrap w-full">
          {genreArray.map((genre: any, index: number) => <GenreChip key={index} {...genre} />)}
        </Box>
        <Typography>{selectedMovie["overview"]}</Typography>
      </Box>

    </Box>
  )
}

export default DetailPage