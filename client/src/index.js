import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/style.css';
import App from './pages/App';
import {Provider} from "react-redux";
import {store} from "./state/store";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: getComputedStyle(document.documentElement).getPropertyValue('--theme-color').trim()
    },
    secondary: {
      main: getComputedStyle(document.documentElement).getPropertyValue('--theme-color-dark').trim()
    }
  },
  typography: {
    fontFamily: [
      'SF-Pro-Display',
    ].join(','),
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>  
    </Provider>
  </React.StrictMode>
);

