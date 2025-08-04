import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router"
import { useEffect } from "react"
import { signInWithEmail } from "../../../_database/supabase"
import useMovieStore from "../../../_store/store"
import GoogleLoginButton from "../../../components/GoogleLoginButton"
import { ValidatedInput } from "../../../components/ValidatedInput"
import KakaoLoginButton from "../../../components/KakaoLoginButton"

const LoginPage = () => {
  const setUser = useMovieStore((state) => state.setUser)
  const setLoginError = useMovieStore((state) => state.setLoginError)

  const navigate = useNavigate()

  const user = useMovieStore((state) => state.user)

  useEffect(
    () => {
      if (!user) { return }
      navigate("/", {replace: true})
    },
    [user]
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const email = target.email.value
    const password = target.password1.value
    
    signInWithEmail(email, password, setUser, setLoginError)
  }

  return (
    <Box component="form" className="flex flex-col gap-3 max-w-[400px] w-full mx-auto" onSubmit={handleSubmit}>

      <ValidatedInput type={"EMAIL"} />
      <ValidatedInput type={"PASSWORD1"} />

      <Button type="submit">로그인</Button>

      <Button onClick={() => navigate("/signup")}>회원가입</Button>

      <Box className="self-center flex flex-col gap-3 ">
        <GoogleLoginButton />
        <KakaoLoginButton />
      </Box>

    </Box>
  )
}

export default LoginPage