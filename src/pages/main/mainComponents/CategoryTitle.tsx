import { Skeleton } from "@mui/material"
import useMovieStore from "../../../_store/store"

const CategoryTitle = ({text}: {text: string}) => {
    const isLoading = useMovieStore((state) => state.isLoading)

    if (isLoading) {
        return <Skeleton variant="rectangular" sx={{borderRadius: "12px"}} height={32} width={232} className="mt-12 mb-6" />
    }

    return (
        <p className="text-2xl font-semibold  pt-12 pb-6 pl-3">{text}</p>
    )
}

export default CategoryTitle