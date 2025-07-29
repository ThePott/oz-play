import FaceIcon from '@mui/icons-material/Face';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signOut } from './_database/supabase';
import useMovieStore from './_store/store';

const ProfileBox = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl)

  const user = useMovieStore((state) => state.user)
  const setUser = useMovieStore((state) => state.setUser)

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!user) {
      navigate("/login")
      return
    }
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleLogoutClick = () => {
    setAnchorEl(null)
    user && signOut(setUser)
  }

  const profileBaseStyle = "transition w-[54px] h-[54px] rounded-full flex justify-center items-center"
  const profileUserStyle = user ? "bg-blue-400" : "border-3 border-blue-400 opacity-60 hover:opacity-100"
  const profileStyle = `${profileBaseStyle} ${profileUserStyle}`

  return (
    <>
      <Box className={profileStyle} onClick={handleClick}>
        {user && <FaceIcon className="text-white" fontSize='large' />}
      </Box>

      {user &&
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}>
          <MenuItem onClick={handleLogoutClick} className="gap-3">
              <LogoutRoundedIcon fontSize="large" />
              <p className="text-xl">Logout</p>
          </MenuItem>
        </Menu>
      }
    </>
  )
}

export default ProfileBox