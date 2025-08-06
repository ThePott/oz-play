import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { colorStyle } from './_constants/colorConstants'
import { useSearchText } from './_hooks/hooks'
import MagnifyingGlassIcon from './components/MagnifyingGlassIcon'

const SearchBox = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [searchParams, _setSearchParams] = useSearchParams()
  const { text, setText, setSearchParamsNow } = useSearchText()
  const location = useLocation()
  const navigate = useNavigate()

  const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)
  
  const handleBlur = () => {
    setSearchParamsNow()
    if (location.pathname === "/") { return }
    navigate(`/?title=${text}`, { viewTransition: true })
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") { return }
    setSearchParamsNow()
    if (location.pathname === "/") { return }
    navigate(`/?title=${text}`, { viewTransition: true })
  }

  const [isFocused, setIsFocused] = useState<boolean>(false)


  useEffect(() => {
    if (location.pathname !== "/") {
      setText("")

      if (inputRef && inputRef.current) {
        inputRef.current.value = ""
      }
    }
  }, [location.pathname])

  const containerBaseStyle = `ml-auto flex transition border-1 outline-0 rounded-xl ${colorStyle.bgBack}`
  const containerFocuseStyle = isFocused ? colorStyle.borderVivid : colorStyle.borderMuted
  const containerStyle = `${containerBaseStyle} ${containerFocuseStyle}`

  const inputBaseStyle = `transition border-0 outline-0`
  const inputFocusStyle = `${isFocused || text ? "w-[300px] p-3 pr-0" : "w-0"}`
  const inputStyle = `${inputBaseStyle} ${inputFocusStyle}`

  const handleIconClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (text) { return }

    event.stopPropagation()
    setIsFocused((prev) => !prev)
  }

  return (
    <Box className={containerStyle}>

      <input
        ref={inputRef}
        type="text"
        defaultValue={searchParams.get("title") ?? ""}
        onChange={handelChange}
        onBlur={() => {
          handleBlur()
          setIsFocused(false)
        }}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        style={{ transitionProperty: "width" }}
        className={inputStyle}
      />

      <Box onMouseDown={handleIconClick} className="p-3">
        <MagnifyingGlassIcon style="text-zinc-400 h-[30px]" />
      </Box>

    </Box>
  )
}

export default SearchBox