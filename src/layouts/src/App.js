import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChatView } from './chat/view';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import ThemeProvider from './theme/index';
import SocketClient from './chat/socketClient';

const theme = createTheme({
  customShadows: {
    primary: '0 8px 16px 0 rgba(0,0,0,0.1)',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}   >
      <SocketClient>
        {/* <Router> */}
        {/* <Routes> */}
        {/* <Route path="dashboard/chat" element={<ChatView />} /> */}
        {/* Define other routes as needed */}
        {/* </Routes> */}
        {/* </Router> */}
        <ChatView />
      </SocketClient>
    </ThemeProvider>
  );
}

export default App;
