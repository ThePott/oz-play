import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router"
import { colorStyle } from "../../../_constants/colorConstants"
import useMovieStore from "../../../_store/store"
import UnauthorizedBox from "./mypageComponents/UnauthorizedBox"
import { useEffect } from "react"

const MyPage = () => {
  const navigate = useNavigate()
  const user = useMovieStore((state) => state.user)

  useEffect(() => {
    if (!user) {
      const timeoutId = setTimeout(() => navigate("/login"), 3000)
      return () => clearTimeout(timeoutId)
    }
  }, [user])

  if (!user) return <UnauthorizedBox />

  const metadata = user.user_metadata

  return (
    <Box className={`${colorStyle.bgFront} max-w-3xl mx-auto p-12`}>
      <h2 className="text-5xl font-semibold">마이페이지</h2>
      <p>{metadata.email}</p>
      <img src={metadata.avatar_url} />
      <img src={metadata.picture} />
      <p>{metadata.name}</p>

      <Button onClick={() => { console.log("---- user:", user) }}>유저 정보 출력</Button>
    </Box>
  )
}

export default MyPage