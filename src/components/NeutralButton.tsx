import { Button } from '@mui/material';
import theme from '../theme';
import type { JSX } from 'react';

const textColor = theme.palette.primary.contrastText;

const neutralSx = {
    // "&.Mui-selected": {
        // backgroundColor: "oklch(0.8 0 0)",
        // color: textColor,
        // "&:hover": {
        //     backgroundColor: "oklch(0.7 0 0)",
        // }
    // }
}

const NeutralButton = ({children}: {children: JSX.Element | string}) => {
    return (
        <Button sx={{color: "oklch(0.9 0 0)", fontWeight: 600}}>{children}</Button>
    )
}

export default NeutralButton