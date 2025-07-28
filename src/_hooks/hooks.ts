import axios from "axios"
import { useEffect, useState } from "react"
import useMovieStore from "../_store/store"
import { getDetail, getMovieALot } from "../_services/tmdbServices"
import { useSearchParams } from "react-router"

const apiReadAccessToken = import.meta.env.VITE_API_READ_ACCESS_TOKEN

const getResponse = async (url: string) => {
    try {
        const response = await axios.get(
            url,
            { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
        )

        console.log("test response", response.data)

    } catch (error) {
        console.error("---- ERROR OCCURRED:", error)
    }
}

export const useTestGet = (url: string) => {
    useEffect(() => { getResponse(url) }, [])
}

export const useMovieGet = () => {
    const setMovieArray = useMovieStore((state) => state.setMovieArray)
    const [searchParams, _setSearchParams] = useSearchParams()
    const query = searchParams.get("title") ?? ""
    useEffect(
        () => {
            getMovieALot(1, setMovieArray, query)
        },
        [searchParams]
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

export const useSearchText = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined)

    const [text, setText] = useState<string>(searchParams.get("title") ?? "")

    useEffect(
        () => {
            if (text === searchParams.get("title")) { return }
            const tempTimeoutId = setTimeout(
                () => {
                    setSearchParams({ title: text })
                },
                1000
            )

            setTimeoutId(Number(tempTimeoutId))
            return () => clearTimeout(tempTimeoutId)
        },
        [text]
    )

    return { text, setText, timeoutId }
}

export const useDarkMode = () => {
    const classList = document.documentElement.classList
    
    const [isDark, setIsDark] = useState(() =>
        classList.contains('dark')
    );

    const toggleDarkMode = () => {
        classList.toggle("dark");
        setIsDark(classList.contains('dark'));
    };

    return { isDark, toggleDarkMode }
}