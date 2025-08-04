import { toggleFavoriteInDb } from "../_database/supabase.ts"
import useMovieStore from "../_store/store.ts"
import HeartIcon from "./HeartIcon.tsx"

const HeartButton = ({ movieId, isRelative }: { movieId: number, isRelative?: boolean }) => {
    const favoriteIdDict = useMovieStore((state) => state.favoriteIdDict)
    const user = useMovieStore((state) => state.user)
    const toggleFavoriteInStore = useMovieStore((state) => state.toggleFavoriteInStore)
    const deleteFromFavoriteDetailDict = useMovieStore((state) => state.deleteFromFavoriteDetailDict)

    const isFavorite = Boolean(favoriteIdDict[movieId])

    if (!user) return null

    const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const user_id = user.identities[0].user_id
        event.stopPropagation()
        event.preventDefault()
        toggleFavoriteInStore(movieId, !isFavorite)
        toggleFavoriteInDb(user_id, movieId, !isFavorite)

        if (isFavorite) {
            deleteFromFavoriteDetailDict(movieId)
        }
    }

    return (
        <div onClick={handleClick} className={`${!isRelative && "absolute top-0 right-0 z-20"} p-2`}>
            <HeartIcon className="h-[30px] text-red-400" doLike={isFavorite} />
        </div>
    )
}

export default HeartButton