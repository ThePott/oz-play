import { TextField } from '@mui/material'
import React, { useState } from 'react'


const makeInputProps = (type: "EMAIL" | "NAME" | "PASSWORD1" | "PASSWORD2") => {
  switch (type) {
    case "NAME":
      return { label: "이름", id: "name", name: "name", type: "text", inputProps: { pattern: "^[가-힣a-zA-Z0-9]+$", minLength: 2, maxLength: 8 } }
    case "EMAIL":
      return { label: "이메일", id: "email", name: "email", type: "email" }
    case "PASSWORD1":
      return { label: "비밀번호", id: "password1", name: "password1", type: "password", inputProps: { minLength: 8, pattern: `^[a-zA-Z0-9]+$` } }
    case "PASSWORD2":
      return { label: "비밀번호 확인", id: "password2", name: "password2", type: "password" }
  }
}

const makeHelperText = (type: "EMAIL" | "NAME" | "PASSWORD1" | "PASSWORD2") => {
  switch (type) {
    case "NAME":
      return "이름은 2~8자의 한글, 영어, 숫자여야 해요"
    case "EMAIL":
      return "올바르지 않은 이메일 형식이에요"
    case "PASSWORD1":
      return "비밀번호는 8자 이상의 한글, 영어여야 해요"
    case "PASSWORD2":
      return "비밀번호가 일치하지 않아요"
  }
}



export const ValidatedInput = ({ type, compareValue, onValueChange }: { type: "EMAIL" | "NAME" | "PASSWORD1" | "PASSWORD2", compareValue?: string, onValueChange?: (value: string) => void }) => {
  const [helperText, setHelperText] = useState<string>("")

  const props = makeInputProps(type)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (type === "PASSWORD1") {
      const value = event.target.value
      onValueChange?.(value)
    }

    if (!event.target.value) {
      setHelperText("")
      return
    }

    if (type === "PASSWORD2" && compareValue !== undefined && event.target.value !== compareValue) {
      event.target.setCustomValidity("비밀번호가 일치하지 않아요")
    } else {
      event.target.setCustomValidity("")
    }

    const isValid = event.target.checkValidity()
    if (isValid) {
      setHelperText("")
      return
    }

    const helperText = makeHelperText(type)
    setHelperText(helperText)
  }

  return (
    <>
      <TextField required helperText={helperText} {...props} onChange={handleChange} />
    </>
  )
}
