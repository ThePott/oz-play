import axios from "axios"
import { useEffect } from "react"
import useMovieStore from "../_store/store"

const apiReadAccessToken = import.meta.env.VITE_API_READ_ACCESS_TOKEN

const getResponse = async (url: string) => {
    try {
        const response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
        )

        console.log("test response", response.data.find((el: any) => el.english_name === "Korean"))

    } catch (error) {
        console.error("---- ERROR OCCURRED:", error)
    }
}

export const useTestGet = (url: string) => {
    useEffect(() => { getResponse(url) }, [])
}

const getJson = async (setMovieArray: (movieArray: any) => void) => {
    try {
        const url = "https://api.themoviedb.org/3/discover/movie?include_adult=false&language=ko&sort_by=popularity&page=2.desc"

        const response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
        )

        const movieArray = response.data.results
        setMovieArray(movieArray)

    } catch (error) {
        console.error("----ERROR OCCURRED:", error)
    }
}

const makeUrl = (page: number) => `https://api.themoviedb.org/3/discover/movie?include_adult=false&language=ko&sort_by=popularity&page=${page}.desc`

const getMovieArrayPromise = async (url: string) => {
    try {
        const response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
        )

        return response.data.results
    } catch (error) {
        console.error("----ERROR OCCURRED:", error)
    }
}

const getMovieGetALot = async (pageLength: number, setMovieArray: (movieArray: any) => void) => {
    const dummyArray = [...Array(pageLength).keys()]
    const promiseArray = dummyArray.reduce((acc: Promise<any>[], index) => {
        const url = makeUrl(index + 1)
        return [...acc, getMovieArrayPromise(url)]
    }, [])

    const resolvedArray = await Promise.all(promiseArray)
    const flattenedArray = resolvedArray.flat()
    
    setMovieArray(flattenedArray)
}

const getDetail = async (movieId: number, setSelectedMovie: (selectedMovie: any) => void) => {
    try {
        // const url = `https://api.themoviedb.org/3/find/external_id?external_source=${movieId}`
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko`
        const response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
        )
        // console.log("---- detail response:", response)
        const movieDetailData = response.data
        setSelectedMovie(movieDetailData)
    } catch (error) {
        console.error("----ERROR OCCURRED:", error)
    }

}

export const useMovieGet = () => {
    const setMovieArray = useMovieStore((state) => state.setMovieArray)
    useEffect(
        () => {
            getMovieGetALot(5, setMovieArray)
        },
        []
    )
}

export const useSelectedMovieGet = (movieId: number) => {
    const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie)
    useEffect(
        () => {
            getDetail(movieId, setSelectedMovie)
        },
        []
    )
}
