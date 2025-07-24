import { Box } from '@mui/material'
import { Outlet } from 'react-router'
import Navbar from './NavBar'

const Layout = () => {
  return (
    <Box className="w-screen h-screen overflow-hidden flex flex-col gap-3">
      <Navbar />
      <Box className="mt-[72px] flex-1 overflow-hidden">
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout