import { Box, Button, Switch } from "@mui/material"
import React from "react"
import { Link, useSearchParams } from "react-router"
import SearchBox from "./SearchBox"
import { useSearchText } from "./_hooks/hooks"
import useMovieStore from "./_store/store"
import { makeButtonSx } from "./_utils/utils"
import ProfileBox from "./ProfileBox"

const menuItemArray = ["TV", "영화", "스포츠", "키즈", "라이브"]


const Navbar = React.memo(() => {
    const [_searchParams, setSearchParams] = useSearchParams()
    const { text, setText, timeoutId, setSearchParamsNow } = useSearchText()

    const toggleIsDark = useMovieStore((state) => state.toggleIsDark)
    const isDark = useMovieStore((state) => state.isDark)

    const handelChange = (event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)
    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        setSearchParamsNow()
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") { return }

        setSearchParamsNow()
    }

    const handleToggle = () => toggleIsDark()


    return (
        <Box className={`flex items-center gap-6 p-3 h-[72px] fixed top-0  z-10 w-full`}>
            <Link to="/" className="text-2xl font-semibold shrink-0">oz play</Link>
            <Box className="transition gap-3 shrink-0 max-[500px]:hidden">
                {menuItemArray.map((menuItem, index) => <Button sx={makeButtonSx("TEXT", isDark)} key={index} >{menuItem}</Button>)}
                <span className="max-[576px]:hidden">
                    <Switch checked={!isDark} onChange={handleToggle} />
                </span>
            </Box>
            <Box className="absolute right-3 flex items-center gap-3">
                <SearchBox text={text} onBlur={handleBlur} onChange={handelChange} onKeyDown={handleKeyDown} />
                <ProfileBox />
            </Box>
        </Box>
    )
})

export default Navbar