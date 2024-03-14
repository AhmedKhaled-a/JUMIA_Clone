
import {createTheme} from '@mui/material';
import { red } from '@mui/material/colors';

export const theme = createTheme({
  palette : {
    primary: {
      light: '#f68b1e',
      main: '#f68b1e',
      dark: '#f68b1e',
      contrastText: '#fff',
    },
    secondary: {
      // light: '#fff2d6',
      main: '#fff2d6',
      // dark: '#633185',
      contrastText: '#000',
    },
    background: {
      default:'#f1f1f2',
      // default: red,
      paper : '#f1f1f2'
    }
  }
});