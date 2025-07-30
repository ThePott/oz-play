import { useSearchParams } from 'react-router'
import { useBasicMovieDictGet, useMovieDictGetCallback, useMovieGet } from '../../_hooks/hooks'
import MainContainer from './mainComponents/MainContainer'
import SearchResultContainer from './mainComponents/SearchResultContainer'
import { useEffect, useRef } from 'react'
import { getUser } from '../../_database/supabase'
import useMovieStore from '../../_store/store'
import { getMovieDict } from '../../_services/tmdbServices'

const MainPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams()
  const setUser = useMovieStore((state) => state.setUser)
  const setProviderCredentialResponse = useMovieStore((state) => state.setProviderCredentialResponse)
  // useMovieGet()
  useBasicMovieDictGet()
  

  useEffect(
    () => {
      getUser(setUser, setProviderCredentialResponse)
    },
    []
  )

  if (searchParams.get("title")) { return <SearchResultContainer /> }

  return (
    <>
      <MainContainer />
    </>
  )
}

export default MainPage