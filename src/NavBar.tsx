import BedtimeIcon from '@mui/icons-material/Bedtime'
import Brightness5Icon from '@mui/icons-material/Brightness5'
import { Box, Switch } from "@mui/material"
import React from "react"
import { Link } from "react-router"
import useMovieStore from "./_store/store"
import ProfileBox from "./ProfileBox"
import SearchBox from "./SearchBox"

const Navbar = React.memo(() => {
    const toggleIsDark = useMovieStore((state) => state.toggleIsDark)
    const isDark = useMovieStore((state) => state.isDark)

    const handleToggle = () => toggleIsDark()

    return (
        <Box className={`flex items-center gap-6 p-3 h-[72px] fixed top-0  z-10 w-full`}>
            <Link to="/" viewTransition className="text-2xl font-semibold shrink-0">oz play</Link>
            <div className="flex items-center gap-3">
                <BedtimeIcon fontSize="large" className={`transition ${!isDark && "opacity-30"}` } />
                <Switch checked={!isDark} onChange={handleToggle} />
                <Brightness5Icon fontSize="large" className={`transition ${isDark && "opacity-30"}`} />
            </div>
            <Box className="absolute right-3 flex items-center gap-3">
                <SearchBox />
                <ProfileBox />
            </Box>
        </Box>
    )
})

export default Navbar