import { Box, Button } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { signInWithEmail } from "../../_database/supabase"
import useMovieStore from "../../_store/store"
import GoogleLoginButton from "../../components/GoogleLoginButton"
import { ValidatedInput } from "../../components/ValidatedInput"

const LoginPage = () => {
  const setUser = useMovieStore((state) => state.setUser)
  const setLoginError = useMovieStore((state) => state.setLoginError)
  const loginError = useMovieStore((state) => state.loginError)

  const navigate = useNavigate()

  const user = useMovieStore((state) => state.user)

  useEffect(
    () => {
      if (!user) { return }
      navigate("/")
    },
    [user]
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const target = event.target as HTMLFormElement
    const email = target.email.value
    const password = target.password.value

    signInWithEmail(email, password, setUser, setLoginError)
  }

  return (
    <Box component="form" className="flex flex-col gap-3 max-w-[400px] w-full mx-auto" onSubmit={handleSubmit}>
      {loginError && <p>이메일 혹은 비밀번호가 유효하지 않습니다</p>}
      <ValidatedInput type={"EMAIL"} />
      <ValidatedInput type={"PASSWORD1"} />
      <Button type="submit">로그인</Button>
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
      <Box className="w-fit self-center">
        <GoogleLoginButton />
      </Box>
    </Box>
  )
}

export default LoginPage