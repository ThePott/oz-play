import FaceIcon from '@mui/icons-material/Face';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import { Box, CircularProgress, Menu, MenuItem } from '@mui/material';
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
  const providerCredentialResponse = useMovieStore((state) => state.providerCredentialResponse)
  // const setGoogleCredentialResponse = useMovieStore((state) => state.setGoogleCredentialResponse)

  const isWaitingLoginResponse = providerCredentialResponse && !user
  const isLoggedIn = user

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log("----user:", user)

    if (!isLoggedIn) {
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
    // googleCredentialResponse && setGoogleCredentialResponse(null)
  }
  const handleMyPageClick = () => {
    setAnchorEl(null)
    navigate("/mypage")
  }



  const profileBaseStyle = "transition w-[54px] h-[54px] rounded-full flex justify-center items-center"
  const profileLoggedInStyle = isLoggedIn ? "bg-blue-400" : "border-3 border-blue-400 opacity-60 hover:opacity-100"
  const profileStyle = `${profileBaseStyle} ${profileLoggedInStyle}`


  return (
    <>
      <Box className={profileStyle} onClick={handleClick}>
        {isLoggedIn && <FaceIcon className="text-white" fontSize='large' />}
        {isWaitingLoginResponse && <CircularProgress />}
      </Box>

      {isLoggedIn &&
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}>

          <MenuItem onClick={handleMyPageClick} className="gap-3">
            <FaceIcon className="text-white" fontSize='large' />
            <p className="text-xl">My Page</p>
          </MenuItem>

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