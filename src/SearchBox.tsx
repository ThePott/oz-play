import { Box } from '@mui/material'
import React, { useState } from 'react'
import MagnifyingGlassIcon from './components/MagnifyingGlassIcon'
import { useSearchParams } from 'react-router'

interface SearchBoxProps {
  text: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void

}

const SearchBox = ({ text, onChange, onBlur, onKeyDown }: SearchBoxProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const containerBaseStyle = `flex p-3 transition border-1 outline-0 rounded-xl`
  const containerFocuseStyle = isFocused ? "border-zinc-400" : "border-zinc-600"
  const containerStyle = `${containerBaseStyle} ${containerFocuseStyle}`

  const inputBaseStyle = `transition border-0 outline-0 rounded-xl`
  const inputFocusStyle = `${isFocused || text ? "w-[300px]" : "w-0"}`
  const inputStyle = `${inputBaseStyle} ${inputFocusStyle}`

  const handleIconClick = () => {
    if (text) { return }
    console.log("---- clicked", text)
    setIsFocused((prev) => !prev)
  }

  return (
    <Box className={containerStyle}>
      <input type="text"
        defaultValue={searchParams.get("title") ?? ""}
        onChange={onChange}
        onBlur={(event) => {
          onBlur(event)
          setIsFocused(false)
        }}
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        style={{ transitionProperty: "width" }}
        className={inputStyle} />
      <Box onClick={handleIconClick}>
        <MagnifyingGlassIcon style="text-zinc-400 h-[30px]" />
      </Box>
    </Box>
  )
}

export default SearchBox