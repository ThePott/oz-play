import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { getFavoriteSet, getUser } from '../../_database/supabase'
import { useMovieDictSet } from '../../_hooks/hooks'
import useMovieStore from '../../_store/store'
import MainContainer from './mainComponents/MainContainer'
import SearchResultContainer from './mainComponents/SearchResultContainer'

/** WRAPPER for getUser, getFavoriteSet */
const getInitialInfos = async (
  setUser: (user: any | null) => void,
  setProviderCredentialResponse: (providerCredentialResponse: any) => void,
  setFavoriteSet: (favoriteSet: Set<number>) => void
) => {

  await getUser(setUser, setProviderCredentialResponse)
  await getFavoriteSet(setFavoriteSet)

}

const useUserInitialWork = () => {
  const setUser = useMovieStore((state) => state.setUser)
  const setProviderCredentialResponse = useMovieStore((state) => state.setProviderCredentialResponse)
  const resetPage = useMovieStore((state) => state.resetPage)
  const setMovieDict = useMovieStore((state) => state.setMovieDict)
  const setFavoriteSet = useMovieStore((state) => state.setFavoriteSet)

  useMovieDictSet()

  useEffect(() => {
    getInitialInfos(setUser, setProviderCredentialResponse, setFavoriteSet)
    return () => {
      resetPage()
      setMovieDict({})
    }
  }, [])
}

const MainPage = () => {
  const [searchParams, _setSearchParams] = useSearchParams()

  useUserInitialWork()

  if (searchParams.get("title")) { return <SearchResultContainer /> }

  return (
    <>
      <MainContainer />
    </>
  )
}

export default MainPage