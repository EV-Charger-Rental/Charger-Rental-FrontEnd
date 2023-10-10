import { useEffect, useState, useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from '../../routes/paths';
import { useRouter, useSearchParams } from '../../routes/hooks';
// hooks
import { useMockedUser } from '../../hooks/use-mocked-user';
// api
import { useGetContacts, useGetConversation, useGetConversations } from '../../api/chat';
// components
import { useSettingsContext } from '../../components/settings';
//
import ChatNav from '../chat-nav';
import ChatRoom from '../chat-room';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';
import ChatHeaderCompose from '../chat-header-compose';
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//import style file
import '../style.css';

// for testing purposes only
import cookie from 'react-cookies';
import { socket } from '../socketClient'



// ----------------------------------------------------------------------

export default function ChatView() {

  const router = useRouter();

  // const { user } = useMockedUser();

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

  const settings = useSettingsContext();

  const searchParams = useSearchParams();

  const selectedConversationId = searchParams.get('id') || '';

  const [recipients, setRecipients] = useState([]);
  const [refreshConversations, setRefreshConversations] = useState(false);

// injectinng the new message in the conversation object
let[newMessage, setNewMessage] = useState({})

socket.on('send-back-message', (message) => {  // use once instead of on to avoid multiple listeners for the same event
  
  setNewMessage(message);
});
console.log('baby message', newMessage)



  const { contacts } = useGetContacts();

  const { conversations, conversationsLoading } = useGetConversations(parseInt(user.id), selectedConversationId);

  const { conversation, conversationError } = useGetConversation(`${selectedConversationId}`);

  // console.log('conversationsssssssssssssssssssssssss', conversation);
  console.log('my messssages', conversation?.messages); 
  // console.log('my participants before', conversation?.participants);
  // console.log('my contact', user);

  //update the conversation object with the new message
  if(newMessage && Object.keys(newMessage).length !== 0){
    if (conversation?.messages && newMessage) {
      conversation.messages.push(newMessage);
      setNewMessage(null);
    }
  }




  const participants = conversation
    ? conversation.participants.filter(participant => participant.userId !== parseInt(user.id))
    : [];

    
  // console.log('participants after', participants);

  useEffect(() => {
    if (conversationError || !selectedConversationId) {
      router.push(paths.dashboard.chat);
    }
  }, [conversationError, router, selectedConversationId]);

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);

  const details = !!conversation;
  // >?????>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {selectedConversationId ? (
        <>{details && <ChatHeaderDetail participants={participants} />}</>
      ) : (
        <ChatHeaderCompose contacts={contacts} onAddRecipients={handleAddRecipients} />
      )}
    </Stack>
  );

  const renderNav = (
    <ChatNav
      contacts={contacts}
      conversations={conversations}
      loading={conversationsLoading}
      selectedConversationId={selectedConversationId}
    />
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      {/* <ChatMessageList messages={conversation?.messages} participants={participants} /> */}
      {selectedConversationId ? <ChatMessageList messages={conversation?.messages} participants={participants} /> :
        <ChatMessageList messages={[]} participants={[]} />
      }

      <ChatMessageInput
        setNewMessage={setNewMessage}
        refreshData={setRefreshConversations}
        recipients={recipients}
        onAddRecipients={handleAddRecipients}
        selectedConversationId={selectedConversationId}
        disabled={!recipients.length && !selectedConversationId}
      />
    </Stack>
  );

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 
  // socket.emit('checkin user', (cookie.load('username')))

  useEffect(() => {
    socket.emit('checkin user', (cookie.load('username')))
  }, []);



  useEffect(() => {
    const chatBox = document.querySelector('#chatBox');
    chatBox.scrollTop = chatBox.scrollHeight;
  },[conversation?.messages.length])  



  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} style={{ width: 'auto' }} >
      <Typography
        variant="h4"
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {/* Chat */}
      </Typography>

      <Stack component={Card} direction="row" sx={{ height: '72vh', marginLeft: '10%', marginRight: '-10%', marginTop: '10%' }}>
        {renderNav}

        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,

            }}
          >
            {renderMessages}

            {details && <ChatRoom conversation={conversation} participants={participants} />}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
