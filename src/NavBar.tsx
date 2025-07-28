import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"

const menuItemArray = ["TV", "영화", "스포츠", "키즈", "라이브"]


const Navbar = React.memo(() => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined)

    const [text, setText] = useState<string>("")

    useEffect(
        () => {
            if (text === searchParams.get("title")) { return }
            const tempTimeoutId = setTimeout(
                () => {
                    console.log("timeout id at end:", timeoutId)
                    setSearchParams({ title: text })
                },
                1000
            )

            setTimeoutId(Number(tempTimeoutId))
            return () => clearTimeout(tempTimeoutId)
        },
        [text]
    )



    const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
        if (timeoutId) { clearTimeout(timeoutId) }

        setSearchParams({ title: event.target.value })
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== "Enter") { return }

        if (timeoutId) { clearTimeout(timeoutId) }

        setSearchParams({ title: event.currentTarget.value })
    }


    return (
        <Box className="flex items-center gap-6 p-3 h-[72px] fixed top-0 bg-zinc-900 z-10 w-full">
            <Link to="/" className="text-2xl font-semibold">oz play</Link>
            <Box className="flex gap-3">
                {menuItemArray.map((menuItem, index) => <Button sx={{ color: "oklch(0.9 0 0)", fontWeight: 600 }} key={index} >{menuItem}</Button>)}
            </Box>
            <input type="text"
                onChange={(event) => setText(event.target.value)}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className="transition p-3 border-1 outline-0 rounded-xl border-zinc-600 focus:border-zinc-400" />
        </Box>
    )
})

export default Navbar