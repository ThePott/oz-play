import useMovieStore from "../_store/store.ts"
import HeartIcon from "./HeartIcon.tsx"

const HeartButton = ({ movieId, doLike }: { movieId: number, doLike: boolean }) => {
    const toggleFavoriteInStore = useMovieStore((state) => state.toggleFavoriteInStore)

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation()
        toggleFavoriteInStore(movieId)
    }

    return (
        <div onClick={handleClick} className="absolute top-0 right-0 z-20 p-2">
            <HeartIcon className="h-[30px] text-red-400" doLike={doLike} />
        </div>
    )
}

export default HeartButton