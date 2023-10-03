import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatView } from './chat/view';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import ThemeProvider from './theme/index';

const theme = createTheme({
  // your theme configuration
  // palette: {
  //   primary: {
  //     main: '#3f50b5',
  //   },
  //   secondary: {
  //     main: '#f50057',
  //   },
  // },

  // components: {
  //   MuiCssBaseline: {
  //     styleOverrides: `
  //       html, body, #root {
  //         height: 100%;
  //       }
  //     `,
  //   },
  // },

  // typography: {
  //   fontFamily: [
  //     'Inter',
  //     'system-ui',
  //     '-apple-system',
  //     'BlinkMacSystemFont',
  //     '"Segoe UI"',
  //     'Roboto',
  //     '"Helvetica Neue"',
  //     'Arial',
  //     'sans-serif',
  //   ].join(','),
  // },

  customShadows: {
    primary: '0 8px 16px 0 rgba(0,0,0,0.1)',
    // primaryMore: '0 8px 16px 0 rgba(0,0,0,0.08)',
    // secondary: '0 8px 16px 0 rgba(0,0,0,0.1)',
    // secondaryMore: '0 8px 16px 0 rgba(0,0,0,0.08)',
    // outlined: '0 0 0 1px rgba(0,0,0,0.1)',
    // outlinedMore: '0 0 0 1px rgba(0,0,0,0.08)',
    // lg: '0 8px 32px 0 rgba(0,0,0,0.1)',
    // lgMore: '0 8px 32px 0 rgba(0,0,0,0.08)',
    // xl: '0 16px 48px -12px rgba(0,0,0,0.1)',
    // xlMore: '0 16px 48px -12px rgba(0,0,0,0.08)',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}   >
    {/* <Router> */}
      {/* <Routes> */}
        {/* <Route path="dashboard/chat" element={<ChatView />} /> */}
        {/* Define other routes as needed */}
      {/* </Routes> */}
    {/* </Router> */}

    <ChatView />

    </ThemeProvider>
  );
}

export default App;
