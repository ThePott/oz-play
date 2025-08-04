import { keyUrlDictArray } from "../_constants/constants"
import type { MovieDict } from "../_store/store"
import { axiosMovie } from "./axiosSettings"

const getJsonPromise = async (url: string, targetArray: string[]) => {
    const response = await axiosMovie.get(url)
    const json = response.data

    if (targetArray.length === 0) { return json }

    const returningJson = targetArray.reduce((acc, cur) => acc[cur], json)
    return returningJson
}

const makePagedUrl = (page: number, query: string) => {
    if (!query) {
        return `https://api.themoviedb.org/3/discover/movie?include_adult=false&certification.lte=19&certification_country=KR&language=ko&page=${page}&sort_by=popularity.desc`
    }

    const trimmedQuery = query.trim()
    return `https://api.themoviedb.org/3/search/movie?query=${trimmedQuery}&include_adult=false&language=ko&page=${page}`
}

export const getDetail = async (movieId: number, setSelectedMovie: (selectedMovie: any) => void) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko&append_to_response=credits,release_dates,videos,recommendations`
    const response = await axiosMovie.get(url)
    const movieDetailData = response.data
    setSelectedMovie(movieDetailData)
}

export const getVariousMovieArray = async () => {
    const result = keyUrlDictArray.reduce(async (acc: Record<string, any>, cur) => {
        acc[cur.key] = await axiosMovie.get(cur.url)
    }, {})
    console.log("---- result:", result)
}

/** 무한 스크롤 중에는 is loading이 없어야 한다 */
export const getMovieDict = async (
    page: number, query: string, movieDict: MovieDict, addToMovieDict: (movieDict: MovieDict) => void, increasePage: () => void,
    setIsLoading?: (isLoading: boolean) => void,

) => {
    if (setIsLoading) { setIsLoading(true) }

    const url = makePagedUrl(page, query)
    const json = await getJsonPromise(url, ["results"])
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
    const json = await getJsonPromise(url, ["results"])
    setPopularMovieArray(json)
}