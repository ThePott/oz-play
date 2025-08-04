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
export type FavoriteIdDict = Record<number, any>

interface MovieState {
    movieDict: MovieDict
    setMovieDict: (movieDict: MovieDict) => void
    addToMovieDict: (movieDict: MovieDict) => void

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

    favoriteIdDict: FavoriteIdDict
    setFavoriteIdDict: (favoriteIdDict: FavoriteIdDict) => void
    toggleFavorite: (movieId: number) => void

    favoriteDetailDict: MovieDict,
    addToFavoriteDetailDict: (movieDetailData: any) => void
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


        selectedMovie: null,
        setSelectedMovie(selectedMovie) {
            set({ selectedMovie })
        },

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
        setError(error) { set({ error }) },
        favoriteIdDict: {},
        setFavoriteIdDict(favoriteIdDict) { set({ favoriteIdDict }) },
        toggleFavorite(movieId) {
            set((state) => {
                const copiedDict = { ...state.favoriteIdDict }

                if (state.favoriteIdDict[movieId]) {
                    delete copiedDict[movieId]
                } else {
                    copiedDict[movieId] = { id: movieId, createdAt: new Date() }
                }

                return { favoriteIdDict: copiedDict }
            })
        },

        favoriteDetailDict: {},
        addToFavoriteDetailDict(movieDetailData) {
            set((state) => {
                const favoriteDetailDict = { [movieDetailData.id]: movieDetailData }
                return { favoriteDetailDict: { ...state.favoriteDetailDict, ...favoriteDetailDict } }
            })
        },
    }),
    {
        name: 'oz-movie-app-user',
        partialize: (state) => ({ user: state.user, }),
    }
))

export default useMovieStore