import { axiosMovie } from "./axiosSettings"
const apiReadAccessToken = import.meta.env.VITE_API_READ_ACCESS_TOKEN

const getJsonPromise = async (url: string, targetArray: string[]) => {
    const response = await axiosMovie.get(
        url,
        { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
    )
    const json = response.data

    if (targetArray.length === 0) { return json }

    const returningJson = targetArray.reduce((acc, cur) => acc[cur], json)
    return returningJson
}

const makePagedUrl = (page: number, query: string) => {
    if (!query) {
        return `https://api.themoviedb.org/3/discover/movie?include_adult=false&certification.lte=19&certification_country=KR&&language=ko&sort_by=popularity&page=${page}.desc`
    }

    const trimmedQuery = query.trim()
    return `https://api.themoviedb.org/3/search/movie?query=${trimmedQuery}&include_adult=false&language=ko&page=1`
}

export const getMovieALot = async (pageLength: number, setMovieArray: (movieArray: any) => void, query: string) => {
    const dummyArray = [...Array(pageLength).keys()]
    const promiseArray = dummyArray.reduce((acc: Promise<any>[], index) => {
        const url = makePagedUrl(index + 1, query)
        const json = getJsonPromise(url, ["results"])

        return [...acc, json]
    }, [])

    const resolvedArray = await Promise.all(promiseArray)
    const flattenedArray = resolvedArray.flat()

    setMovieArray(flattenedArray)
}

export const getDetail = async (movieId: number, setSelectedMovie: (selectedMovie: any) => void) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko&append_to_response=credits,release_dates,videos,recommendations`
    const response = await axiosMovie.get(
        url,
        { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
    )
    const movieDetailData = response.data
    setSelectedMovie(movieDetailData)
}