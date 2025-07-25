import { create } from "zustand"



interface MovieState {
    movieArray: any
    setMovieArray: (movieArray: any) => void
    selectedMovie: any
    setSelectedMovie: (selectedMovie: any) => void
}

const useMovieStore = create<MovieState>()((set) => ({
    movieArray: [],
    setMovieArray(movieArray) { set({ movieArray }) },
    selectedMovie: null,
    setSelectedMovie(selectedMovie) {
        set({selectedMovie})
    },
}))

export default useMovieStore