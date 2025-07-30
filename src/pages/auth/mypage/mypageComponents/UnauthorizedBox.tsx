import { Box, Button } from '@mui/material'
import { colorStyle } from '../../../../_constants/colorConstants'

const UnauthorizedBox = () => {
  return (
    <Box className={`${colorStyle.bgFront} p-12 mx-auto`}>
      <h2 className="text-3xl font-semibold">접근 권한이 없습니다</h2>
      <p>잠시 후 로그인 페이지로 이동합니다</p>
      <Button>지금 로그인하기</Button>
    </Box>
  )
}

export default UnauthorizedBox