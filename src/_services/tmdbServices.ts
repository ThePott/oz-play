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

const makePagedUrl = (page: number) => `https://api.themoviedb.org/3/discover/movie?include_adult=false&certification.lte=19&certification_country=KR&&language=ko&sort_by=popularity&page=${page}.desc`

export const getMovieALot = async (pageLength: number, setMovieArray: (movieArray: any) => void) => {
    const dummyArray = [...Array(pageLength).keys()]
    const promiseArray = dummyArray.reduce((acc: Promise<any>[], index) => {
        const url = makePagedUrl(index + 1)
        const json = getJsonPromise(url, ["results"])

        return [...acc, json]
    }, [])

    const resolvedArray = await Promise.all(promiseArray)
    const flattenedArray = resolvedArray.flat()

    setMovieArray(flattenedArray)
}

export const getDetail = async (movieId: number, setSelectedMovie: (selectedMovie: any) => void) => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko&append_to_response=credits,release_dates`
    // const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko`
    const response = await axiosMovie.get(
        url,
        { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
    )
    // debugger
    const movieDetailData = response.data
    setSelectedMovie(movieDetailData)
}