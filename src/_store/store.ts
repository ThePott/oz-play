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

interface MovieState {
    movieArray: any
    setMovieArray: (movieArray: any) => void
    selectedMovie: any
    setSelectedMovie: (selectedMovie: any) => void

    searchedMovieArray: any
    setSearchedMovieArray: (searchText: string) => void

    isDark: boolean
    initializeIsDark: () => void
    toggleIsDark: () => void

    movieArrayDict: any
    updateArrayFromDict: (key: string, movieArray: any) => void

    user: any | null
    setUser: (user: any | null) => void

    googleCredentialResponse: any | null
    setGoogleCredentialResponse: (googleCredentialResponse: any | null) => void
}

const useMovieStore = create<MovieState>()(
    persist(
        (set) => ({
            movieArray: [],
            setMovieArray(movieArray) { set({ movieArray }) },
            selectedMovie: null,
            setSelectedMovie(selectedMovie) {
                set({ selectedMovie })
            },

            searchedMovieArray: null,
            setSearchedMovieArray(searchedMovieArray) { set({ searchedMovieArray }) },

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

            movieArrayDict: {},
            updateArrayFromDict(key, movieArray) {
                set((state) => {
                    return { movieArrayDict: { ...state.movieArrayDict, [key]: movieArray } }
                })
            },

            user: null,
            setUser(user) { set({ user }) },

            googleCredentialResponse: null,
            setGoogleCredentialResponse(googleCredentialResponse) { set({ googleCredentialResponse }) },
        }),
        {
            name: 'oz-movie-app-user',
            partialize: (state) => ({ user: state.user, googleCredentialResponse: state.googleCredentialResponse }),
        }
    )
)

export default useMovieStore