import { Box } from '@mui/material'
import useMovieStore from './_store/store'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'
import FaceIcon from '@mui/icons-material/Face';

const ProfileBox = () => {
  // const navigate = useNavigate()
  const user = useMovieStore((state) => state.user)

  useEffect(() => {
    
  }, [user])

  const handleClick = () => {
    console.log("---- user:", user)
  }

  return (
    <Box className="w-[54px] h-[54px] rounded-full bg-blue-400 flex justify-center items-center" onClick={handleClick}>
      {user && <FaceIcon className="text-white" fontSize='large' />}
    </Box>
  )
}

export default ProfileBox