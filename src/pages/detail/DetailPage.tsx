import { imageBaseUrl } from '../../_constants/constants'
import { Box, Button, Typography } from '@mui/material'
import { useSelectedMovieGet } from "../../_hooks/hooks"
import { useParams } from "react-router"
import useMovieStore from "../../_store/store"
import { useEffect } from 'react'
import YoutubeBox from './detailComponents/YoutubeBox'
import MovieCardGrid from '../main/mainComponents/MovieCardGrid'
import { colorStyle } from '../../_constants/colorConstants'

const GenreChip = ({ id, name }: { id: number, name: string }) => {
  return (
    <Button variant='outlined' className={`p-3 ${colorStyle.fontVivid} ${colorStyle.borderVivid}`}>{name}</Button>
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
  const youtubeKey = selectedMovie.videos.results[0].key
  const genreArray = selectedMovie["genres"]
  const recommendationArray = selectedMovie.recommendations.results

  const voteAverage = Math.round(selectedMovie["vote_average"] * 10) / 10
  const voteInfo = `⭐️ ${voteAverage}(${selectedMovie["vote_count"]})`
  return (
    <Box className="flex flex-col md:grid grid-cols-3 gap-12 flex-1 h-full overflow-scroll px-3">

      <Box className="col-span-2 flex flex-col gap-6">
        <YoutubeBox youtubeKey={youtubeKey} />

        {/* <Box className='flex flex-col gap-6 max-w-[750px] w-full'> */}
        <p className="text-5xl font-semibold">{selectedMovie["title"]}</p>
        <Box>
          <p className="text-2xl mb-2">{selectedMovie.tagline}</p>
          <p>{voteInfo}</p>
        </Box>

        <Box className="flex gap-3 flex-wrap w-full">
          {genreArray.map((genre: any, index: number) => <GenreChip key={index} {...genre} />)}
        </Box>
        <Typography>{selectedMovie["overview"]}</Typography>
      </Box>

      {/* </Box> */}

      <Box className='flex flex-col gap-6 max-w-[750px] w-full'>
        <Box>
          <MovieCardGrid movieCardInfoArray={recommendationArray} isLoading={false} />
        </Box>
      </Box>

    </Box>
  )
}

export default DetailPage