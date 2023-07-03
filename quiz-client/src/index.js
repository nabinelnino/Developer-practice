import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import { ContextProvider } from './hooks/useStateContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography:{
    fontFamily:'"IBM Plex Sans"'
  }
})

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
