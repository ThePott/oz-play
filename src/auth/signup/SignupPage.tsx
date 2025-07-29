import { Box, Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { signUp } from '../../_database/supabase';
import useMovieStore from '../../_store/store';
import { useNavigate } from 'react-router';

interface FormData {
    name: string
    email: string
    password1: string
    password2: string
}

interface FormError {
    nameError?: string
    emailError?: string
    password1Error?: string
    password2Error?: string
}

interface SetErrorProps {
    setNameError: (nameError: string) => void;
    setEmailError: (emailError: string) => void;
    setPassword1Error: (password1Error: string) => void;
    setPassword2Error: (password2Error: string) => void;
}


const validateForm = (formData: FormData, setErrorDict: SetErrorProps) => {
    const errorDepth = Object.entries(formData).reduce((acc: number, cur, index) => {
        return cur[1] ? index : acc
    }, -1)

    if (errorDepth === -1) {
        setErrorDict.setNameError("")
        return
    }
    if (errorDepth >= 0) {
        if (formData.name.length < 2 || formData.name.length > 8) {
            setErrorDict.setNameError("이름은 2~8자여야 합니다")
        } else if (!/^[가-힣a-zA-Z0-9]+$/.test(formData.name)) {
            setErrorDict.setNameError("이름은 2~8자의 숫자, 한글, 영어여야 합니다")
        } else {
            setErrorDict.setNameError("")
        }
    }
    if (errorDepth >= 1) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setErrorDict.setEmailError("올바른 이메일 형식이 아닙니다")
        } else {
            setErrorDict.setEmailError("")
        }
    }
    if (errorDepth >= 2) {
        if (!formData.password1) {
            setErrorDict.setPassword1Error("비밀번호를 입력해주세요")
        } else if (formData.password1.length < 8) {
            setErrorDict.setPassword1Error("비밀번호는 최소 8자 이상이어야 합니다")
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password1)) {
            setErrorDict.setPassword1Error("영문 대소문자 + 숫자 + 특수문자 조합으로 입력해주세요")
        } else {
            setErrorDict.setPassword1Error("")
        }
    }
    if (errorDepth >= 3) {
        if (formData.password1 !== formData.password2) {
            setErrorDict.setPassword2Error("비밀번호가 일치하지 않습니다")
        } else {
            setErrorDict.setPassword2Error("")
        }
    }

    // debugger
}

const SignupPage = () => {
    const [formData, setFormData] = useState<FormData>({ name: "", email: "", password1: "", password2: "" })
    const [formError, setFormError] = useState<FormError>({})

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


    const setName = (name: string) => setFormData((prev) => ({ ...prev, name }))
    const setEmail = (email: string) => setFormData((prev) => ({ ...prev, email }))
    const setPassword1 = (password1: string) => setFormData((prev) => ({ ...prev, password1 }))
    const setPassword2 = (password2: string) => setFormData((prev) => ({ ...prev, password2 }))

    const setNameError = (nameError: string) => setFormError((prev) => ({ ...prev, nameError }))
    const setEmailError = (emailError: string) => setFormError((prev) => ({ ...prev, emailError }))
    const setPassword1Error = (password1Error: string) => setFormError((prev) => ({ ...prev, password1Error }))
    const setPassword2Error = (password2Error: string) => setFormError((prev) => ({ ...prev, password2Error }))

    const setErrorDict: SetErrorProps = { setNameError, setEmailError, setPassword1Error, setPassword2Error }

    useEffect(() => { validateForm(formData, setErrorDict) }, [formData])


    // const formRef = useRef<HTMLFormElement>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const name = formData.name
        const email = formData.email
        const password1 = formData.password1
        const password2 = formData.password2

        console.log("---- result:", name, email, password1, password2)
        signUp(name, email, password1, setUser)
    }

    return (
        <Box component="form" className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <TextField
                label="이름" type="text" variant="outlined" id="name" name="name" onChange={(event) => setName(event.target.value)}
                helperText={formError.nameError}
            />
            <TextField
                label="이메일" type='email' variant="outlined" id="email" name="email" onChange={(event) => setEmail(event.target.value)}
                helperText={formError.emailError}
            />
            <TextField
                label="비밀번호" type="password" variant="outlined" id="password1" name="password1"
                helperText={formError.password1Error}
                onChange={(event) => setPassword1(event.target.value)} />
            <TextField
                label="비밀번호 확인" type="password" variant="outlined" id="password2" name="password2"
                helperText={formError.password2Error}
                onChange={(event) => setPassword2(event.target.value)}
            />
            <Button type="submit">회원가입</Button>
        </Box>
    )
}

export default SignupPage