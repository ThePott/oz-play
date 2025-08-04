import { Box } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { colorStyle } from "../../../_constants/colorConstants"
import { getFavoriteIdDict } from "../../../_database/supabase"
import { useFavoriteMovieDict } from "../../../_hooks/hooks"
import useMovieStore from "../../../_store/store"
import MovieCardGrid from "../../main/mainComponents/MovieCardGrid"
import UnauthorizedBox from "./mypageComponents/UnauthorizedBox"

const MyPage = () => {
  const navigate = useNavigate()
  const user = useMovieStore((state) => state.user)

  const favorteDetailDict = useMovieStore((state) => state.favoriteDetailDict)
  const favoriteMovieArray = Object.values(favorteDetailDict)

  const setFavoriteIdDict = useMovieStore((state) => state.setFavoriteIdDict)

  useFavoriteMovieDict()

  useEffect(() => {
    if (!user) {
      const timeoutId = setTimeout(() => navigate("/login", { replace: true }), 3000)
      return () => clearTimeout(timeoutId)
    }

    if (Object.values(favorteDetailDict).length === 0) {
      getFavoriteIdDict(setFavoriteIdDict)
    }
  }, [user])

  if (!user) return <UnauthorizedBox />

  const metadata = user.user_metadata
  const pictureSrc = metadata.picture ? metadata.picture : metadata.avatar_url
  return (
    <Box sx={{}} className={`${colorStyle.bgBack} px-3 py-12 h-full overflow-y-scroll overflow-x-hidden flex flex-col gap-12`}>
      <h2 className="text-4xl font-semibold col-span-full text-center">마이페이지</h2>

      <div className="grid grid-cols-2 gap-3 h-[200px] shrink-0">
        <img src={pictureSrc} className="rounded-3xl justify-self-end h-[200px]" />
        <div style={{ gridColumn: "2 /  -2" }} className="flex flex-col justify-end font-semibold">
          <p className="text-2xl">{metadata.name}</p>
          <p>{metadata.email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-semibold text-center">찜 목록</h3>
        {favoriteMovieArray.length === 0 && <h3 className={`font-semibold ${colorStyle.fontMuted} text-center py-6 opacity-50`}>아직 찜한 영화가 없어요</h3>}
        <MovieCardGrid movieArray={favoriteMovieArray} />
      </div>
    </Box>
  )
}

export default MyPage