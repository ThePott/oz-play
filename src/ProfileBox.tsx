import { Box } from '@mui/material'
import useMovieStore from './_store/store'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const ProfileBox = () => {
  const navigate = useNavigate()
  const user = useMovieStore((state) => state.user)

  useEffect(() => {
    
  }, [user])

  const handleClick = () => {
    console.log("---- user:", user)
  }

  return (
    <Box className="w-[40px] h-[40px] rounded-full bg-amber-300" onClick={handleClick}>
      
    </Box>
  )
}

export default ProfileBox