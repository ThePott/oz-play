import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { getUser } from '../../_database/supabase'
import { useMovieDictSet } from '../../_hooks/hooks'
import useMovieStore from '../../_store/store'
import MainContainer from './mainComponents/MainContainer'
import SearchResultContainer from './mainComponents/SearchResultContainer'

const MainPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams()

  const setUser = useMovieStore((state) => state.setUser)
  const setProviderCredentialResponse = useMovieStore((state) => state.setProviderCredentialResponse)
  const resetPage = useMovieStore((state) => state.resetPage)
  const setMovieDict = useMovieStore((state) => state.setMovieDict)

  useMovieDictSet()

  useEffect(() => {
    getUser(setUser, setProviderCredentialResponse)
    return () => {
      resetPage()
      setMovieDict({})
    }
  }, [])

  if (searchParams.get("title")) { return <SearchResultContainer /> }

  return (
    <>
      <MainContainer />
    </>
  )
}

export default MainPage