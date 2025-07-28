import axios from "axios"
import { useEffect } from "react"
import useMovieStore from "../_store/store"
import { getDetail, getMovieALot } from "../_services/tmdbServices"

const apiReadAccessToken = import.meta.env.VITE_API_READ_ACCESS_TOKEN

const getResponse = async (url: string) => {
    try {
        const response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
        )

        console.log("test response", response.data.certifications.KR)

    } catch (error) {
        console.error("---- ERROR OCCURRED:", error)
    }
}

export const useTestGet = (url: string) => {
    useEffect(() => { getResponse(url) }, [])
}

export const useMovieGet = () => {
    const setMovieArray = useMovieStore((state) => state.setMovieArray)
    useEffect(
        () => {
            getMovieALot(5, setMovieArray)
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
