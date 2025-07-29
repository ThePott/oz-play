import { useSearchParams } from 'react-router'
import { useMovieGet } from '../../_hooks/hooks'
import MainContainer from './mainComponents/MainContainer'
import SearchResultContainer from './mainComponents/SearchResultContainer'

const MainPage = () => {
  useMovieGet()
  const [searchParams, _setSearchParams] = useSearchParams()


  if (searchParams.get("title")) { return <SearchResultContainer /> }

  return (
    <>
      <MainContainer />
    </>
  )
}

export default MainPage