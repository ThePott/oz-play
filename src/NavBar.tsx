import { Box, Button, Switch } from "@mui/material"
import React, { useEffect } from "react"
import { Link, useSearchParams } from "react-router"
import SearchBox from "./SearchBox"
import { colorStyle } from "./_constants/colorConstants"
import { useSearchText } from "./_hooks/hooks"
import useMovieStore from "./_store/store"
import { isSystemDark } from "./_utils/utils"

const menuItemArray = ["TV", "영화", "스포츠", "키즈", "라이브"]


const Navbar = React.memo(() => {
    const [_searchParams, setSearchParams] = useSearchParams()
    const { text, setText, timeoutId } = useSearchText()
    const toggleIsDark = useMovieStore((state) => state.toggleIsDark)

    useEffect(
        () => {
            if (isSystemDark()) {
                document.documentElement.classList.add("dark")
            }
        },
        []
    )


    const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)
    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (timeoutId) { clearTimeout(timeoutId) }

        const value = event.target.value
        value ? setSearchParams({ title: value }) : setSearchParams({})
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") { return }

        if (timeoutId) { clearTimeout(timeoutId) }

        const value = event.currentTarget.value
        value ? setSearchParams({ title: value }) : setSearchParams({})
    }

    const handleToggle = () => toggleIsDark()


    return (
        <Box className={`flex items-center gap-6 p-3 h-[72px] fixed top-0 ${colorStyle.bgFront} z-10 w-full`}>
            <Link to="/" className="text-2xl font-semibold shrink-0">oz play</Link>
            <Box className="gap-3 hidden md:flex grow">
                {menuItemArray.map((menuItem, index) => <Button sx={{ color: "oklch(0.9 0 0)", fontWeight: 600 }} key={index} >{menuItem}</Button>)}
                <Switch onChange={handleToggle} />
            </Box>
            <SearchBox text={text} onBlur={handleBlur} onChange={handelChange} onKeyDown={handleKeyDown} />
        </Box>
    )
})

export default Navbar