import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import useMovieStore from "../_store/store"
import { getDetail, getMovieDict } from "../_services/tmdbServices"
import { useSearchParams } from "react-router"

// const apiReadAccessToken = import.meta.env.VITE_API_READ_ACCESS_TOKEN

// const getResponse = async (url: string) => {
//     try {
//         const response = await axios.get(
//             url,
//             { headers: { Authorization: `Bearer ${apiReadAccessToken}` } }
//         )

//         console.log("test response", response.data)

//     } catch (error) {
//         console.error("---- ERROR OCCURRED:", error)
//     }
// }

// export const useTestGet = (url: string) => {
//     useEffect(() => { getResponse(url) }, [])
// }

// export const useMovieGet = () => {
//     const setMovieArray = useMovieStore((state) => state.setMovieArray)
//     const [searchParams, _setSearchParams] = useSearchParams()
//     const query = searchParams.get("title") ?? ""
//     const page = useMovieStore((state) => state.page)
//     const increasePage = useMovieStore((state) => state.increasePage)

//     useEffect(
//         () => {
//             console.log("---- NO CALL AFTER MOUNT")
//             // getMovieALot(page, setMovieArray, query, increasePage)
//         },
//         [query]
//     )
// }

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
    const resetPage = useMovieStore((state) => state.resetPage)

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

// export const useBottomAppendation = () => {
//     const [searchParams, _setSearchParams] = useSearchParams()
//     const page = useMovieStore((state) => state.page)
//     const increasePage = useMovieStore((state) => state.increasePage)
//     // const resetPage = useMovieStore((state) => state.resetPage)
//     const appendMovieArray = useMovieStore((state) => state.appendMovieArray)
//     const query = searchParams.get("title") ?? ""
//     const bottomRef = useRef(null);

//     const startRef = useRef<number>(Number(new Date()))


//     const callback = () => {
//         const now = Number(new Date())

//         if ((now - startRef.current) < 2000) { return }

//         // getMovieALot(page, appendMovieArray, query, increasePage)
//         startRef.current = Number(new Date())
//     }

//     useEffect(() => {
//         console.log("--- new page in effect:", page)
//         const observer = new IntersectionObserver(
//             (entries) => intersectionCallback(entries, callback), {
//             threshold: 0.75
//         });

//         if (bottomRef.current) {
//             observer.observe(bottomRef.current);
//         }

//         return () => {
//             console.log("---- clean up observer for:", page)
//             observer.disconnect()
//         }
//     }, [page])

//     // useEffect(() => { return () => resetPage() }, [query])

//     return { bottomRef }
// }

/** 메인 페이지에서 호출 -> 쿼리 있든 없든 대응 */
export const useMovieDictSet = () => {
    const [searchParams, _setSearchParams] = useSearchParams()
    const page = useMovieStore((state) => state.page)
    const increasePage = useMovieStore((state) => state.increasePage)
    const query = searchParams.get("title") ?? ""
    const movieDict = useMovieStore((state) => state.movieDict)
    const setMovieDict = useMovieStore((state) => state.setMovieDict)
    const setIsLoading = useMovieStore((state) => state.setIsLoading)

    useEffect(() => {
        // console.log("---- fetch from basic:", page, query)
        getMovieDict(page, query, movieDict, setMovieDict, increasePage, setIsLoading)
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

export const useFavoriteMovieDict = () => {
    const favoriteIdDict = useMovieStore((state) => state.favoriteIdDict)
    const addToFavoriteDetailDict = useMovieStore((state) => state.addToFavoriteDetailDict)
    const favoriteIdArray = Object.keys(favoriteIdDict)
    console.log("---- favorite id array:", favoriteIdArray)

    useEffect(() => {
        favoriteIdArray.forEach((movieId) => {
            getDetail(Number(movieId), addToFavoriteDetailDict)
        })
    }, [favoriteIdDict])
}

// export const useAddToFavorites = () => {
//     const 

//     const toggleFavorite = useCallback(() => {}, [])
// }