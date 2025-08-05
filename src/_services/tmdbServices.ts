import type { MovieDict } from "../_store/store"
import { axiosTmdb } from "./axiosTmdb"

const makePagedUrl = (page: number, query: string) => {
    if (!query) {
        return `https://api.themoviedb.org/3/discover/movie?include_adult=false&certification.lte=19&certification_country=KR&language=ko&page=${page}&sort_by=popularity.desc`
    }

    const trimmedQuery = query.trim()
    return `https://api.themoviedb.org/3/search/movie?query=${trimmedQuery}&include_adult=false&language=ko&page=${page}`
}

export const getDetail = async (movieId: number, setSelectedMovie: (selectedMovie: any) => void) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko&append_to_response=credits,release_dates,videos,recommendations`
    const response = await axiosTmdb.post("", url)
    const movieDetailData = response.data
    setSelectedMovie(movieDetailData)
}

/** 무한 스크롤 중에는 is loading이 없어야 한다 */
export const getMovieDict = async (
    page: number, query: string, movieDict: MovieDict, addToMovieDict: (movieDict: MovieDict) => void, increasePage: () => void,
    setIsLoading?: (isLoading: boolean) => void,

) => {
    if (setIsLoading) { setIsLoading(true) }

    const url = makePagedUrl(page, query)
    const response = await axiosTmdb.post("", url)
    const json = response.data
    const newMovieDict = json.reduce((acc: MovieDict, cur: any) => {
        if (movieDict[cur.id]) {
            return acc
        }

        const pageIncludedDict = { ...cur, page }
        acc[cur.id] = pageIncludedDict
        return acc
    }, {})
    addToMovieDict(newMovieDict)
    increasePage()
    if (setIsLoading) { setIsLoading(false) }
}

export const getPopularMovieArray = async (setPopularMovieArray: (popluarMovieArray: any[]) => void) => {
    const url = "https://api.themoviedb.org/3/trending/movie/day?language=ko"
    const response = await axiosTmdb.post("", url)
    const json = response.data
    setPopularMovieArray(json)
}