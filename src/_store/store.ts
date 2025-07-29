import { create } from "zustand"



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
}

const useMovieStore = create<MovieState>()((set) => ({
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
}))

export default useMovieStore