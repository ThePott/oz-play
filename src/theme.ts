import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    // mode: 'light', // or 'dark'
    mode: 'dark', // or 'dark'
  },
  typography: {
    fontSize: 16,
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h4: 'h1',
          h5: 'h2',
          h6: 'h3',
          subtitle1: 'h6',
          subtitle2: 'h6',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined"
      }
    }
  },
});



export default theme