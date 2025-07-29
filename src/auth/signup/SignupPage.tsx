import { Box, Button, TextField } from '@mui/material';
import { useRef } from 'react';
import { signUp } from '../../_database/supabase';

const SignupPage = () => {
    const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!formRef.current) { return }

        const formData = new FormData(formRef.current)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const password1 = formData.get("password1") as string
        const password2 = formData.get("password2") as string

        if (password1 !== password2) {
            console.error("---- password 1, 2 not same:", password1, password2)
            return
        }

        signUp(name, email, password1)
    }

    return (
        <Box ref={formRef} component="form" className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <TextField label="이름" type="text" variant="outlined" id="name" name="name" />
            <TextField label="이메일" type='email' variant="outlined" id="email" name="email" />
            <TextField label="비밀번호" type="password" variant="outlined" id="password1" name="password1" />
            <TextField label="비밀번호 확인" type="password" variant="outlined" id="password2" name="password2" />
            <Button type="submit">회원가입</Button>
        </Box>
    )
}

export default SignupPage