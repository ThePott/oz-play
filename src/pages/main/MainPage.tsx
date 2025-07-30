import { useSearchParams } from 'react-router'
import { useMovieGet } from '../../_hooks/hooks'
import MainContainer from './mainComponents/MainContainer'
import SearchResultContainer from './mainComponents/SearchResultContainer'
import { useEffect } from 'react'
import { getUser } from '../../_database/supabase'
import useMovieStore from '../../_store/store'

const MainPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams()
  const setUser = useMovieStore((state) => state.setUser)
  const setProviderCredentialResponse = useMovieStore((state) => state.setProviderCredentialResponse)  
  useMovieGet()

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