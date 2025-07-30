import { axiosMovie } from "./axiosSettings"
import { keyUrlDictArray, makeGenreUrl, genreDictArray } from "../_constants/constants"
import type { MovieDict } from "../_store/store"

const getJsonPromise = async (url: string, targetArray: string[]) => {
    const response = await axiosMovie.get(url)
    const json = response.data

    if (targetArray.length === 0) { return json }

    const returningJson = targetArray.reduce((acc, cur) => acc[cur], json)
    return returningJson
}

const makePagedUrl = (page: number, query: string) => {
    if (!query) {
        return `https://api.themoviedb.org/3/discover/movie?include_adult=false&certification.lte=19&certification_country=KR&language=ko&sort_by=popularity&page=${page}.desc`
    }

    const trimmedQuery = query.trim()
    return `https://api.themoviedb.org/3/search/movie?query=${trimmedQuery}&include_adult=false&language=ko&page=1`
}

export const getMovieALot = async (page: number, setMovieArray: (movieArray: any) => void, query: string, increasePage: () => void) => {
    console.log("---- page:", page)
    const url = makePagedUrl(page, query)
    const json = await getJsonPromise(url, ["results"])

    setMovieArray(json)
    if (!increasePage) {
        console.error("---- no page increase")
        return
    }
    increasePage()
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

export const getMovieDict = async (page: number, query: string, movieDict: MovieDict, addToMovieDict: (movieDict: MovieDict) => void, increasePage: () => void) => {
    const url = makePagedUrl(page, query)
    const json = await getJsonPromise(url, ["results"])

    const newMovieDict = json.reduce((acc: MovieDict, cur: any) => {
        if (movieDict[cur.id]) { 
            return acc 
        }
        
        // if (cur.id === 575265 || cur.id === "575265") {debugger}

        const pageIncludedDict = { ...cur, page }
        acc[cur.id] = pageIncludedDict
        return acc
    }, {})

    addToMovieDict(newMovieDict)
    increasePage()

    // debugger
}