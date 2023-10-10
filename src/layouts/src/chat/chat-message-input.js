import PropTypes from 'prop-types';
import { sub } from 'date-fns';
import { useRef, useState, useCallback, useMemo } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
// routes
import { paths } from '../routes/paths';
import { useRouter } from '../routes/hooks';
// hooks
import { useMockedUser } from '../hooks/use-mocked-user';
// utils
import uuidv4 from '../utils/uuidv4';
// api
import { sendMessage, createConversation } from '../api/chat';
// components
import Iconify from '../components/iconify';
import { socket } from './socketClient'
import cookie from 'react-cookies';


// ----------------------------------------------------------------------

export default function ChatMessageInput({
  setNewMessage,
  refreshData,
  recipients,
  onAddRecipients,
  //
  disabled,
  selectedConversationId,
}) {



  const router = useRouter();

  // const { user } = useMockedUser();

  const fileRef = useRef(null);

  const [message, setMessage] = useState('');

  const user = {
    "id": cookie.load('userId'),
    "displayName": cookie.load('username'),
    "email": cookie.load('email'),
    "photoURL": "https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_25.jpg",
    "phoneNumber": cookie.load('phoneNumber'),
    "address": cookie.load('address'),
    "role": cookie.load('role'),
    "state": "California",
    "city": "San Francisco",
    "zipCode": "94116",
    "about": "Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.",
    "role": "admin",
    "isPublic": true
  }

  const myContact = useMemo(
    () => ({
      id: user.id,
      role: user.role,
      email: user.email,
      address: user.address,
      name: user.displayName,
      lastActivity: new Date(),
      avatarUrl: user.photoURL,
      phoneNumber: user.phoneNumber,
      status: 'online',
    }),
    [user]
  );

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: sub(new Date(), { minutes: 1 }),
      senderId: myContact.id,
      // senderId: cookie.load('userId'),
      // recieverId: recipients.map((recipient) => recipient.id),
    }),
    [message, myContact.id]
  );

  const conversationData = useMemo(
    () => ({
      id: uuidv4(),
      messages: [messageData],
      participants: [...recipients, myContact],
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData, myContact, recipients]
  );

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleChangeMessage = useCallback((event) => {
    setMessage(event.target.value);
  }, []);


  const handleSendMessage = useCallback(
    async (event) => {
      try {
        if (event.key === 'Enter' && message) {
          if (selectedConversationId) {
            console.log(' iam her 1111111111111')
           let res = await sendMessage(selectedConversationId, messageData);

            // const chatMessagesRef = document.getElementById('chat-messages');
            // chatMessagesRef.scrollTop = chatMessagesRef.scrollHeight;

            console.log('message>>>>>>>>>>>>>>>>>>>>>>before',message)
            setMessage('');  // Clear the message once after sending or taking the relevant action
            console.log('message>>>>>>>>>>>>>>>>>>>>>>after ',message)

          } else {
            const res = await createConversation(conversationData);
            if (res.truthyValue) {
              router.push(`${paths.dashboard.chat}?id=${res.id}`);
            } else {
              router.push(`${paths.dashboard.chat}?id=${res.conversation.id}`);
            }
            refreshData(true);
            onAddRecipients([]);
          }
          setMessage('');  // Clear the message once after sending or taking the relevant action


        }
      } catch (error) {
        console.error(error);
      }
    },
    [conversationData, message, messageData, onAddRecipients, router, selectedConversationId]
);

  // const handleSendMessage = useCallback(
  //   async (event) => {
  //     try {
  //       if (event.key === 'Enter') {
  //         if (message) { 
  //           if (selectedConversationId) {
              
  //            await sendMessage(selectedConversationId, messageData);
  //             // when submit the message then scroll to bottom
  //             // const chatMessagesRef = document.getElementById('chat-messages');
  //             // chatMessagesRef.scrollTop = chatMessagesRef.scrollHeight;
              
  //             setMessage('');
  //             const chatMessagesRef = document.getElementById('chat-messages');
  //             chatMessagesRef.scrollTop = chatMessagesRef.scrollHeight;


  //           } else {
  //             const res = await createConversation(conversationData);
  //             if (res.truthyValue) {
  //               router.push(`${paths.dashboard.chat}?id=${res.id}`);
  //               refreshData(true);
  //               onAddRecipients([]);
  //             }else{
  //             router.push(`${paths.dashboard.chat}?id=${res.conversation.id}`);
  //             refreshData(true);
  //             onAddRecipients([]);
  //             }
  //           }
  //         }

  //         setMessage('');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }

      
  //   },
  //   [conversationData, message, messageData, onAddRecipients, router, selectedConversationId]
  // );



  return (
    <>
      <InputBase
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        disabled={disabled}
        startAdornment={
          <IconButton>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:microphone-bold" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}

ChatMessageInput.propTypes = {
  disabled: PropTypes.bool,
  onAddRecipients: PropTypes.func,
  recipients: PropTypes.array,
  selectedConversationId: PropTypes.string,
  refreshData: PropTypes.func,
  setNewMessage: PropTypes.func,
};
