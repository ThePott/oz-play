import { Box, createTheme, ThemeProvider } from '@mui/material'
import { useEffect } from 'react'
import { Outlet } from 'react-router'
import Navbar from './NavBar'
import { colorStyle } from './_constants/colorConstants'
import useMovieStore from './_store/store'

const Layout = () => {
  const isDark = useMovieStore((state) => state.isDark)
  const initializeIsDark = useMovieStore((state) => state.initializeIsDark)
  useEffect(() => { initializeIsDark() }, [])
  
  const theme = createTheme({
    palette: {
      mode: isDark ? 'dark' : "light"
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box className={`w-screen h-screen overflow-hidden flex flex-col gap-3 ${colorStyle.bgBack} ${colorStyle.fontVivid}`} >
        <Navbar />
        <Box className="mt-[72px] flex-1 overflow-hidden">
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Layout