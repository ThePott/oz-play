import { useEffect } from 'react'
import { useSearchParams } from 'react-router'
import { getFavoriteIdDict, getUser } from '../../_database/supabase'
import { useMovieDictSet } from '../../_hooks/hooks'
import useMovieStore, { type FavoriteIdDict } from '../../_store/store'
import MainContainer from './mainComponents/MainContainer'
import SearchResultContainer from './mainComponents/SearchResultContainer'

/** WRAPPER for getUser, getFavoriteIdDict */
const getInitialInfos = async (
  setUser: (user: any | null) => void,
  setProviderCredentialResponse: (providerCredentialResponse: any) => void,
  setFavoriteIdDict: (favoriteIdDict: FavoriteIdDict) => void
) => {

  await getUser(setUser, setProviderCredentialResponse)
  await getFavoriteIdDict(setFavoriteIdDict)

}

const useUserInitialWork = () => {
  const setUser = useMovieStore((state) => state.setUser)
  const setProviderCredentialResponse = useMovieStore((state) => state.setProviderCredentialResponse)
  const resetPage = useMovieStore((state) => state.resetPage)
  const setMovieDict = useMovieStore((state) => state.setMovieDict)
  const setFavoriteIdDict = useMovieStore((state) => state.setFavoriteIdDict)

  useMovieDictSet()

  useEffect(() => {
    getInitialInfos(setUser, setProviderCredentialResponse, setFavoriteIdDict)
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