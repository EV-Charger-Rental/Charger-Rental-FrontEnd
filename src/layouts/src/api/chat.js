import { useMemo } from 'react';
import keyBy from 'lodash/keyBy';
import useSWR, { mutate } from 'swr';
// utils
import axios, { endpoints, fetcher } from '../utils/axios';
import cookie from 'react-cookies';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import { socket } from '../chat/socketClient';
import { useState, useEffect } from 'react';
import { use } from 'i18next';
// import { co } from '@fullcalendar/core/internal-common';




// ----------------------------------------------------------------------

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetContacts() {
  // const URL = [endpoints.chat, { params: { endpoint: 'contacts' } }];
  const URL = process.env.REACT_APP_SERVER_URL + '/api/mhmd/users';
  // console.log(URL);

  let { data, isLoading, error, isValidating } = useSWR(URL, fetcher, options);

  let cuurentUser = cookie.load('username')


  function transformUserData(userData) {
    if (!Array.isArray(userData)) {
      return { contacts: [] };
    }

    return {
      contacts: userData
        .filter((user) => user.username !== cuurentUser)
        .map((user) => ({
          status: user.status || 'offline',
          id: user.id || '',
          role: user.role || '',
          email: user.email || '',
          name: user.username || '',
          lastActivity: user.lastActivity || '',
          address: user.location || '',
          avatarUrl: user.avatarUrl || '',
          phoneNumber: user.phone || '',
        })),
    };
  }



  data = transformUserData(data);
  // console.log('>>>>>>>>>>>>',data.contacts);

  const memoizedValue = useMemo(
    () => ({
      contacts: data?.contacts || [],
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
      contactsEmpty: !isLoading && !data?.contacts.length,
    }),
    [data?.contacts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetConversations(userId, selectedConversationId) {

  let [conversations, setConversations] = useState(null);
  let [isLoading, setIsLoading] = useState(true);
  let [error, setError] = useState(null);
  let [isValidating, setIsValidating] = useState(false); // You can set this based on your validation logic
  let[incomingCreatedConversation, setIncomingCreatedConversation] = useState(false);

  socket.on('new-recieved-conversation-created',()=>{
    setIncomingCreatedConversation(prev=>!prev);
  })


  useEffect(() => {
    socket.emit('get all conversations from server', userId);

    // This function will be called every time the event is emitted
    const handleConversationsFromServer = (conversations) => {
      setConversations(conversations);
      setIsLoading(false);  // Move this inside to ensure it's updated after receiving data
    };

    socket.on('send-all conversations-from-server', handleConversationsFromServer);

    // Cleanup function: Remove the event listener when the component unmounts
    return () => {
      socket.off('send-all conversations-from-server', handleConversationsFromServer);
    };

  }, [userId,selectedConversationId,incomingCreatedConversation ]); // Depend on `userId` so that this effect runs whenever `userId` changes

  let byId = {}
  let allIds = []
  if(conversations) {
    byId = keyBy(conversations, 'id') || {};
    allIds = Object.keys(byId).reverse() || [];  // Flip the order here    // setIsLoading(false)
  }

  return {
    conversations: {
      byId,
      allIds,
    },
    conversationsLoading: isLoading,
    conversationsError: error,
    conversationsValidating: isValidating,
    conversationsEmpty: !isLoading && !allIds.length,
  }
}

// ----------------------------------------------------------------------



export function useGetConversation(conversationId) {
  const [conversation, setConversation] = useState(null);
  const [conversationLoading, setConversationLoading] = useState(true);
  const [conversationError, setConversationError] = useState(null);
  const [conversationValidating, setConversationValidating] = useState(false); // You can set this based on your validation logic
  // const [updateConversation, setUpdateConversation] = useState(false);

  // socket.on('update-conversation',()=>{
  //   setUpdateConversation(prev=>!prev);
  // })

  useEffect(() => {
    setConversation(null);
    if (conversationId) {
      setConversationLoading(true);
      setConversationError(null);

      // .................................................
      // const handleMessageSaved = () => {
        

      //   const handleReceiveConversation = (conversation) => {
      //     setConversation(conversation);
      //     // setConversationLoading(false);
      //   };
  
      //   socket.on('send-conversation by id-from-server', handleReceiveConversation);
  
      //   socket.emit('get conversation by id', conversationId);

      // };
    
      // socket.on('update-conversation', handleMessageSaved);
      // .................................................




      const handleReceiveConversation = (conversation) => {
        setConversation(conversation);
        // setConversationLoading(false);
      };

      socket.on('send-conversation by id-from-server', handleReceiveConversation);
      console.log('conversationId',conversationId)
      socket.emit('get conversation by id', conversationId);

      // Clean up listener to prevent memory leaks
      return () => {
        // socket.off('send-conversation by id-from-server', handleReceiveConversation);
      };
    }
  }, [conversationId]);

  return {
    conversation,
    conversationLoading,
    conversationError,
    conversationValidating,
  };
}




// ----------------------------------------------------------------------


export function sendMessage(conversationId, messageData) {
  messageData.id = conversationId;


  return new Promise((resolve, reject) => {
   socket.emit('send-message', messageData);
   resolve("message sent")
    // handle error event (assuming there is an error event)
    socket.on('error', (error) => {
      reject(error);
    });
  });
}




// export  function sendMessage(conversationId, messageData) {
//   messageData.id = conversationId;
//   // let [message, setMessage] = useState(null);

//   // useEffect(() => {
//   //   socket.emit('send-message', messageData);
//   //   socket.on('send-back-message', (message) => {
//   //     setMessage(message);
//   //   });
//   // }, [messageData]);
//   socket.emit('send-message', messageData);
//   socket.on('send-back-message', (message) => {
//     console.log('Newwwwwwwwwwwwmessage',message)
//     return message;
//   });

//   // return message;

// }

// ----------------------------------------------------------------------

  export async function createConversation(conversationData) {
    const data = { conversationData };
    
    let res;
    
    res = await new Promise((resolve) => {
      console.log('dataaaaaaaaaaaa',data)
      socket.emit('create-conversation', data);
      
      socket.on('conversation already exist',(conversationId)=>{
        let conversation = {
          "id": conversationId,
          "truthyValue": true
        }
        resolve(conversation); // Resolve the promise with the received data.
      });

      socket.on('send-conversation-from-server', (totalCoversationObject) => {
        let conversation = {
          "conversation": totalCoversationObject,
        }
        resolve(conversation); // Resolve the promise with the received data.
      });
    });
  

    return res;
  }
  

// ----------------------------------------------------------------------

export async function clickConversation(conversationId, userId) {
  const data = { conversationId, userId };
  let res;
  res = await new Promise((resolve) => {
    socket.emit('click-conversation', data);
    resolve('conversation clicked'); // Resolve the promise with the received data.
  });
  return res;
}
 


// ----------------------------------------------------------------------

