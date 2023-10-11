import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatView } from './chat/view';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import DashboardNavbar from '../../examples/Navbars/DashboardNavbar'
// import ThemeProvider from './theme/index';
import SocketClient from './chat/socketClient';

const theme = createTheme({
  customShadows: {
    primary: '0 8px 16px 0 rgba(0,0,0,0.1)',
  },
});

function App() {
  return (
    <>
    <DashboardNavbar/>
    <ThemeProvider theme={theme}   >
      <SocketClient>
        <ChatView />
      </SocketClient>
    </ThemeProvider>
    </>
  );
}

export default App;
