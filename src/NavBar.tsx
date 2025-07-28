import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"
import { Link, useSearchParams } from "react-router"

const menuItemArray = ["TV", "영화", "스포츠", "키즈", "라이브"]


const Navbar = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const handleBlur = () => {
        
    }
    const handleKeydown = () => {}

    return (
        <Box className="flex items-center gap-6 p-3 h-[72px] fixed top-0 bg-zinc-900 z-10 w-full">
            <Link to="/" className="text-2xl font-semibold">oz play</Link>
            <Box className="flex gap-3">
                {menuItemArray.map((menuItem, index) => <Button sx={{color: "oklch(0.9 0 0)", fontWeight: 600}} key={index} >{menuItem}</Button>)}
            </Box>
            {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
            <input type="text" 
            onChange={(event) => setSearchParams({title: event.target.value})}
            // onKeyDown={}
            // onBlur={}
            className="transition p-3 border-1 outline-0 rounded-xl border-zinc-600 focus:border-zinc-400" />
        </Box>
    )
}

export default Navbar