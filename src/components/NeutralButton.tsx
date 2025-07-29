import { Button } from '@mui/material';
import theme from '../theme';
import type { JSX } from 'react';

const textColor = theme.palette.primary.contrastText;


const NeutralButton = ({children}: {children: JSX.Element | string}) => {
    return (
        <Button 
        // sx={{
        //     color: "oklch(0.9 0 0)",
        //      fontWeight: 600}}
             className="!text-red-700">{children}</Button>
    )
}

export default NeutralButton