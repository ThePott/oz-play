import { Box, Button, TextField } from "@mui/material"
import { signInWithEmail } from "../../_database/supabase"
import { useNavigate } from "react-router"
import useMovieStore from "../../_store/store"
import { useEffect } from "react"

const LoginPage = () => {
  const setUser = useMovieStore((state) => state.setUser)
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

    signInWithEmail(email, password, setUser)
  }

  return (
    <Box component="form" className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <TextField type="text" label="이메일" id="email" name="email" />
      <TextField type="password" label="비밀번호" id="password" name="password" />
      <Button type="submit">로그인</Button>
      <Button onClick={() => navigate("/signup")}>회원가입</Button>
    </Box>
  )
}

export default LoginPage