import { Box, Button } from "@mui/material"
import { Link } from "react-router"

const menuItemArray = ["TV", "영화", "스포츠", "키즈", "라이브"]

const Navbar = () => {
    return (
        <Box className="flex items-center gap-6 p-3 h-[72px] fixed top-0 bg-zinc-900 z-10 w-full">
            <Link to="/" className="text-2xl font-semibold">oz play</Link>

            <Box className="flex gap-3">
                {menuItemArray.map((menuItem, index) => <Button sx={{color: "oklch(0.9 0 0)", fontWeight: 600}} key={index} >{menuItem}</Button>)}
            </Box>
        </Box>
    )
}

export default Navbar