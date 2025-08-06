import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router"
import { getDetail, getMovieDict, getPopularMovieArray } from "../_services/tmdbServices"
import useMovieStore from "../_store/store"



export const useSelectedMovieGet = (movieId: number) => {
    const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie)
    useEffect(
        () => {
            getDetail(movieId, setSelectedMovie)
        },
        [movieId]
    )
}

export const useSearchText = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined)

    const [text, setText] = useState<string>(searchParams.get("title") ?? "")
    const resetPage = useMovieStore((state) => state.resetPage)

    const location = useLocation()
    const navigate = useNavigate()

    const setSearchParamsNow = useCallback(() => {
        if (timeoutId) {
            clearTimeout(timeoutId)
            setTimeoutId(undefined)
        }

        resetPage()

        if (!text) {
            setSearchParams({})
            return
        }

        setSearchParams({ title: text })
    }, [text])

    useEffect(
        () => {
            if (text === searchParams.get("title")) { return }
            const tempTimeoutId = setTimeout(
                () => {
                    resetPage()
                    if (!text) {
                        setSearchParams({})
                        return
                    }

                    setSearchParams({ title: text })

                    if (location.pathname === "/") { return }
                    navigate(`/?title=${text}`)
                },
                1000
            )

            setTimeoutId(Number(tempTimeoutId))
            return () => clearTimeout(tempTimeoutId)
        },
        [text]
    )

    return { text, setText, timeoutId, setSearchParamsNow }
}

const intersectionCallback = (entries: any, callback: any) => {
    entries.forEach((entry: any) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0) {
            callback()
        }
    });
}


/** 메인 페이지에서 호출 -> 쿼리 있든 없든 대응 */
export const useMovieDictSet = () => {
    const [searchParams, _setSearchParams] = useSearchParams()
    const page = useMovieStore((state) => state.page)
    const increasePage = useMovieStore((state) => state.increasePage)
    const query = searchParams.get("title") ?? ""
    const movieDict = useMovieStore((state) => state.movieDict)
    const setMovieDict = useMovieStore((state) => state.setMovieDict)
    const setIsLoading = useMovieStore((state) => state.setIsLoading)
    const setPopularMovieArray = useMovieStore((state) => state.setPopularMovieArray)

    useEffect(() => {
        getMovieDict(page, query, movieDict, setMovieDict, increasePage, setIsLoading)
        getPopularMovieArray(setPopularMovieArray)
    }, [query])
}


export const useMovieDictAdd = () => {
    const [searchParams, _setSearchParams] = useSearchParams()
    const page = useMovieStore((state) => state.page)
    const increasePage = useMovieStore((state) => state.increasePage)
    const query = searchParams.get("title") ?? ""
    const movieDict = useMovieStore((state) => state.movieDict)
    const addToMovieDict = useMovieStore((state) => state.addToMovieDict)

    const getMoreMovieDict = useCallback(() => {
        console.log("---- fetch from manual button click:", page)
        getMovieDict(page, query, movieDict, addToMovieDict, increasePage)
    }, [page, query])

    return { getMoreMovieDict }
}

export const useBottomAdd = () => {
    const bottomRef = useRef(null);
    const startRef = useRef<number>(Number(new Date()))

    const [searchParams, _setSearchParams] = useSearchParams()
    const query = searchParams.get("title") ?? ""

    const page = useMovieStore((state) => state.page)
    const increasePage = useMovieStore((state) => state.increasePage)
    const movieDict = useMovieStore((state) => state.movieDict)
    const addToMovieDict = useMovieStore((state) => state.addToMovieDict)

    const callbackIntersection = useCallback(() => {
        if (Object.values(movieDict).length === 0) { return }

        if (page <= 2) {
            getMovieDict(page, query, movieDict, addToMovieDict, increasePage)
            startRef.current = Number(new Date())
            return
        }

        const diff = 3000 - (Number(new Date()) - startRef.current)

        const timeoutId = setTimeout(() => {
            getMovieDict(page, query, movieDict, addToMovieDict, increasePage)
            startRef.current = Number(new Date())
        }, diff)

        return () => clearTimeout(timeoutId)
    }, [page, query, movieDict])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => intersectionCallback(entries, callbackIntersection),
            { threshold: 0.5 }
        )

        if (bottomRef.current) { observer.observe(bottomRef.current); }

        return () => { observer.disconnect() }
    }, [page])




    return { bottomRef }
}

const getDetailMany = async (favoriteIdArray: string[], addToFavoriteDetailDict: (movieDetailData: any) => void, setIsLoading: (isLoading: boolean) => void) => {
    setIsLoading(true)
    favoriteIdArray.forEach(async (movieId) => {
        await getDetail(Number(movieId), addToFavoriteDetailDict)
    })
    setIsLoading(false)
}

export const useFavoriteMovieDict = () => {
    const favoriteIdDict = useMovieStore((state) => state.favoriteIdDict)
    const addToFavoriteDetailDict = useMovieStore((state) => state.addToFavoriteDetailDict)
    const favoriteIdArray = Object.keys(favoriteIdDict)
    const setIsLoading = useMovieStore((state) => state.setIsLoading)
    console.log("---- favorite id array:", favoriteIdArray)

    useEffect(() => {
        getDetailMany(favoriteIdArray, addToFavoriteDetailDict, setIsLoading)
    }, [favoriteIdDict])
}
