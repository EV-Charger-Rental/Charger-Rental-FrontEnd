// SocketClient.js
import { useEffect } from 'react';
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000/peer-to-peer';

const socket = io(SERVER_URL);

const SocketClient = ({ children }) => {
  useEffect(() => {
    return () => {
      socket.disconnect(
        console.log('client disconnected')
      );
    };
  }, []);

  return children;
};

export { socket };
export default SocketClient;
