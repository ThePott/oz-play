import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../_database/supabase';
import useMovieStore from '../../_store/store';
import { ValidatedInput } from '../../components/ValidatedInput';


const SignupPage = () => {
    const setUser = useMovieStore((state) => state.setUser)
    const navigate = useNavigate()

    const user = useMovieStore((state) => state.user)
    const [password2HelperText, setPassword2HelperText] = useState("")

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
        const elements = target.elements

        const name = (elements.namedItem("name") as HTMLInputElement).value
        const email = (elements.namedItem("email") as HTMLInputElement).value
        const password1 = (elements.namedItem("password1") as HTMLInputElement).value
        const password2 = (elements.namedItem("password2") as HTMLInputElement).value

        if (password1 !== password2) {
            setPassword2HelperText("비밀번호가 일치하지 않아요")
            return
        }


        signUp(name, email, password1, setUser)
    }
    const typeArray = ["NAME", "EMAIL", "PASSWORD1", "PASSWORD2"] as const

    return (
        <Box component="form" className="flex flex-col gap-3" onSubmit={handleSubmit}>
            {typeArray.map((type) => <ValidatedInput key={type} type={type} />)}
            {password2HelperText && <p>{password2HelperText}</p>}
            <Button type="submit">회원가입</Button>
        </Box>
    )
}

export default SignupPage