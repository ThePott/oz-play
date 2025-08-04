import { Box, Button, Switch } from "@mui/material"
import React from "react"
import { Link } from "react-router"
import useMovieStore from "./_store/store"
import { makeButtonSx } from "./_utils/utils"
import ProfileBox from "./ProfileBox"
import SearchBox from "./SearchBox"

const menuItemArray = ["TV", "영화", "스포츠", "키즈", "라이브"]


const Navbar = React.memo(() => {
    
    const toggleIsDark = useMovieStore((state) => state.toggleIsDark)
    const isDark = useMovieStore((state) => state.isDark)
    const favoriteIdDict = useMovieStore((state) => state.favoriteIdDict)
    const favoriteDetailDict = useMovieStore((state) => state.favoriteDetailDict)

    const handleToggle = () => toggleIsDark()

    return (
        <Box className={`flex items-center gap-6 p-3 h-[72px] fixed top-0  z-10 w-full`}>
            <Link to="/" className="text-2xl font-semibold shrink-0">oz play</Link>
            <Box className="transition gap-3 shrink-0 max-[500px]:hidden">
                {menuItemArray.map((menuItem, index) => <Button sx={makeButtonSx("TEXT", isDark)} key={index} >{menuItem}</Button>)}
                <span className="max-[576px]:hidden">
                    <Switch checked={!isDark} onChange={handleToggle} />
                </span>
                <Button onClick={() => console.log("---- favorite:", favoriteIdDict, favoriteDetailDict)}>즐겨찾기</Button>
            </Box>
            <Box className="absolute right-3 flex items-center gap-3">
                <SearchBox />
                <ProfileBox />
            </Box>
        </Box>
    )
})

export default Navbar