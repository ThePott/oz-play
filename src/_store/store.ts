import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

// ------------------------- 구조 어떻게 유연하게 만들지 고민해봐야 -----------------------
interface MovieArrayDict {
    trendingMovieArray: []

    nowPlayingMovieArray: []
    upComingMovieArray: []
    topRatedMovieArray: []
    trendingTvArray: []



    movieArray: []
}

export type MovieDict = Record<number, any>

interface MovieState {
    movieDict: MovieDict
    setMovieDict: (movieDict: MovieDict) => void
    addToMovieDict: (movieDict: MovieDict) => void

    // movieArray: any
    // setMovieArray: (movieArray: any) => void
    // appendMovieArray: (movieArray: any) => void
    selectedMovie: any
    setSelectedMovie: (selectedMovie: any) => void

    isDark: boolean
    initializeIsDark: () => void
    toggleIsDark: () => void

    user: any | null
    setUser: (user: any | null) => void

    loginError: any
    setLoginError: (loginError: any) => void

    providerCredentialResponse: any
    setProviderCredentialResponse: (providerCredentialResponse: any) => void

    page: number
    increasePage: () => void
    resetPage: () => void

    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    error: any
    setError: (error: any) => void
}

const useMovieStore = create<MovieState>()(persist(
    (set) => ({
        movieDict: {},
        setMovieDict(movieDict) {
            set((state) => {
                return { movieDict }
            })
        },
        addToMovieDict(movieDict) {
            set((state) => {
                return { movieDict: { ...state.movieDict, ...movieDict } }
            })
        },

        // /** DEPRECATED */
        // movieArray: [],
        // /** DEPRECATED */
        // setMovieArray(movieArray) {
        //     set((state) => {
        //         console.log("---- setting...")
        //         return { movieArray }
        //     }
        //     )
        // },
        // /** DEPRECATED */
        // appendMovieArray(movieArray) {
        //     set((state) => {
        //         return { movieArray: [...state.movieArray, ...movieArray] }
        //     })
        // },
        selectedMovie: null,
        setSelectedMovie(selectedMovie) {
            set({ selectedMovie })
        },

        // searchedMovieArray: null,
        // setSearchedMovieArray(searchedMovieArray) { set({ searchedMovieArray }) },

        isDark: false,
        initializeIsDark() {
            set(() => {
                const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches

                if (isSystemDark) { document.documentElement.classList.add("dark") }

                return { isDark: isSystemDark }
            })
        },
        toggleIsDark() {
            set((state) => {
                document.documentElement.classList.toggle("dark")
                return { isDark: !state.isDark }
            })
        },

        // movieArrayDict: {},
        // updateArrayFromDict(key, movieArray) {
        //     set((state) => {
        //         return { movieArrayDict: { ...state.movieArrayDict, [key]: movieArray } }
        //     })
        // },

        user: null,
        setUser(user) { set({ user }) },

        loginError: null,
        setLoginError(loginError) { set({ loginError }) },

        providerCredentialResponse: null,
        setProviderCredentialResponse(providerCredentialResponse) { set({ providerCredentialResponse }) },

        page: 1,
        increasePage() {
            set((state) => {
                return { page: state.page + 1 }
            })
        },
        resetPage() { set({ page: 1 }) },

        isLoading: false,
        setIsLoading(isLoading) { set({ isLoading }) },
        //------------------------아직은 따로 핸들링을 안 함------------------
        error: null,
        setError(error) { set({ error }) }
    }),
    {
        name: 'oz-movie-app-user',
        partialize: (state) => ({ user: state.user, }),
    }
))

export default useMovieStore