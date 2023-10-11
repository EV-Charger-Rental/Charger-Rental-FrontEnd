// SocketClient.js
import { useEffect } from 'react';
import io from 'socket.io-client';
import cookie from 'react-cookies';

// const SERVER_URL = 'http://localhost:3000/new-peer-to-peer';
const SERVER_URL = `${process.env.REACT_APP_SERVER_URL}/new-peer-to-peer`

const socket = io(SERVER_URL);

const SocketClient = ({ children }) => {
  useEffect(() => {
    socket.connect();
    console.log('client connected');
  }, []);

  useEffect(() => {
    return () => {
      // Emit 'checkout user' event with username right before disconnecting
      const userName = cookie.load('username');
      socket.emit('checkout user', userName);

      socket.disconnect();
      console.log('client disconnected');
    };
  }, []);

  return children;
};

export { socket };
export default SocketClient;


// import { useEffect } from 'react';
// import io from 'socket.io-client';

// const SERVER_URL = 'http://localhost:3000/new-peer-to-peer';

// const socket = io(SERVER_URL);

// const SocketClient = ({ children }) => {
//   useEffect(() => {
//     socket.connect();
//     console.log('client connected');
//   }, []);

//   useEffect(() => {
//     const handleDisconnect = () => {
//       // Send additional data, e.g., username, before disconnecting
//       const username = 'your_username_here';
//       socket.emit('disconnecting', { username }, () => {
//         socket.disconnect();
//         console.log('client disconnected');
//       });
//     };

//     // socket.on('disconnect', handleDisconnect);

//     return () => {
//       socket.off('disconnect', handleDisconnect);
//     };
//   }, []);

//   return children;
// };

// export { socket };
// export default SocketClient;
