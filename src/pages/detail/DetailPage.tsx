import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useParams } from "react-router"
import { imageBaseUrl } from '../../_constants/constants'
import { addToFavorites } from '../../_database/supabase'
import { useSelectedMovieGet } from "../../_hooks/hooks"
import useMovieStore from "../../_store/store"
import { makeButtonSx } from '../../_utils/utils'
import MovieCardGrid from '../main/mainComponents/MovieCardGrid'
import YoutubeBox from './detailComponents/YoutubeBox'

const GenreChip = ({ id, name }: { id: number, name: string }) => {
  const isDark = useMovieStore((state) => state.isDark)
  return (
    <Button variant='outlined' sx={makeButtonSx('OUTLINED', isDark)} className="p-3 shrink-0">{name}</Button>
  )
}

const DetailPage = () => {
  const params = useParams()
  const movieId = Number(params.movieId)
  const selectedMovie = useMovieStore((state) => state.selectedMovie)
  const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie)
  useSelectedMovieGet(movieId)

  useEffect(() => {
    return () => setSelectedMovie(null)
  }, [])
  const user = useMovieStore((state) => state.user)
  
  if (!selectedMovie) { return null }
  
  const videoInfo = selectedMovie.videos.results[0]
  const backdropPath = selectedMovie.backdrop_path
  const backdropSrc = `${imageBaseUrl}${backdropPath}`
    
  const genreArray = selectedMovie["genres"]
  const recommendationArray = selectedMovie.recommendations.results
  
  const voteAverage = Math.round(selectedMovie["vote_average"] * 10) / 10
  const voteInfo = `⭐️ ${voteAverage}(${selectedMovie["vote_count"]})`
  
  const handleClick = () => {
    if (!user) { return }
    const user_id = user.identities[0].user_id
    addToFavorites(user_id, selectedMovie.id)

  }

  return (
    <Box sx={{ scrollbarColor: "oklch(0.5 0 0) transparent" }} className="flex flex-col md:grid grid-cols-3 gap-12 flex-1 h-full overflow-y-scroll px-3">

      <Box className="col-span-2 flex flex-col gap-6">
        {videoInfo && <YoutubeBox youtubeKey={videoInfo.key} />}
        {!videoInfo && <img src={backdropSrc} alt="backdrop" />}

        <Button onClick={handleClick}>찜하기</Button>

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


      <Box className='flex flex-col gap-6 max-w-[750px] w-full'>
        <Box>
          <MovieCardGrid movieArray={recommendationArray} />
        </Box>
      </Box>

    </Box>
  )
}

export default DetailPage