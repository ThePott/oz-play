import { Switch } from '@mui/material';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';
import { useState } from 'react';

const LightDarkSwitch = () => {
    const { mode, setMode } = useColorScheme()
    if (!mode) {
        return null;
    }
    return (
        <Box className="bg-amber-50">
            하하하하
            <Switch onChange={(_event, checked) => setMode(checked ? "light" : "dark")} />
        </Box>
    );
}


export default LightDarkSwitch