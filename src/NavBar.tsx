import { Box, Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link, useSearchParams } from "react-router"
import SearchBox from "./SearchBox"

const menuItemArray = ["TV", "영화", "스포츠", "키즈", "라이브"]


const Navbar = React.memo(() => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined)

    const [text, setText] = useState<string>(searchParams.get("title") ?? "")

    useEffect(
        () => {
            if (text === searchParams.get("title")) { return }
            const tempTimeoutId = setTimeout(
                () => {
                    setSearchParams({ title: text })
                },
                1000
            )

            setTimeoutId(Number(tempTimeoutId))
            return () => clearTimeout(tempTimeoutId)
        },
        [text]
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


    return (
        <Box className="flex items-center gap-6 p-3 h-[72px] fixed top-0 bg-zinc-900 z-10 w-full">
            <Link to="/" className="text-2xl font-semibold shrink-0">oz play</Link>
            <Box className="gap-3 hidden md:flex grow">
                {menuItemArray.map((menuItem, index) => <Button sx={{ color: "oklch(0.9 0 0)", fontWeight: 600 }} key={index} >{menuItem}</Button>)}
            </Box>
            <SearchBox text={text} onBlur={handleBlur} onChange={handelChange} onKeyDown={handleKeyDown} />
        </Box>
    )
})

export default Navbar