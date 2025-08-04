import { create } from "zustand"
import { persist } from 'zustand/middleware'

export type MovieDict = Record<number, any>
export type FavoriteIdDict = Record<number, any>

interface MovieState {
    movieDict: MovieDict
    setMovieDict: (movieDict: MovieDict) => void
    addToMovieDict: (movieDict: MovieDict) => void

    popularMovieArray: any[]
    setPopularMovieArray: (popluarMovieArray: any[]) => void

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
    toggleFavoriteInStore: (movieId: number, to: boolean) => void

    favoriteDetailDict: MovieDict,
    resetFavoriteDetailDict: () => void
    addToFavoriteDetailDict: (movieDetailData: any) => void
    deleteFromFavoriteDetailDict: (movieId: number) => void
}

const useMovieStore = create<MovieState>()(persist(
    (set) => ({
        movieDict: {},
        setMovieDict(movieDict) {
            set({ movieDict })
        },
        addToMovieDict(movieDict) {
            set((state) => {
                return { movieDict: { ...state.movieDict, ...movieDict } }
            })
        },

        popularMovieArray: [],
        setPopularMovieArray(popularMovieArray) { set({ popularMovieArray }) },

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
        toggleFavoriteInStore(movieId, to) {
            set((state) => {
                const copiedDict = { ...state.favoriteIdDict }

                if (to) {
                    copiedDict[movieId] = { id: movieId, created_at: Number(new Date()) }
                } else {
                    delete copiedDict[movieId]
                }

                return { favoriteIdDict: copiedDict }
            })
        },

        favoriteDetailDict: {},
        resetFavoriteDetailDict() { set({ favoriteDetailDict: {} }) },
        addToFavoriteDetailDict(movieDetailData) {
            set((state) => {
                const favoriteDetailDict = { [movieDetailData.id]: movieDetailData }
                return { favoriteDetailDict: { ...state.favoriteDetailDict, ...favoriteDetailDict } }
            })
        },
        deleteFromFavoriteDetailDict(movieId) {
            set((state) => {
                const copiedDict = { ...state.favoriteDetailDict }
                delete copiedDict[movieId]
                return { favoriteDetailDict: copiedDict }
            })
        },
    }),
    {
        name: 'oz-movie-app-user',
        partialize: (state) => ({ user: state.user, }),
    }
))

export default useMovieStore