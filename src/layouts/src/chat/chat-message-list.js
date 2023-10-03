// import React, { useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Scrollbar from '../components/scrollbar';
// import Lightbox, { useLightBox } from '../components/lightbox';
// import { useMessagesScroll } from './hooks';
// import ChatMessageItem from './chat-message-item';

// export default function ChatMessageList({ messages = [], participants }) {
//   const { messagesEndRef } = useMessagesScroll(messages);
//   const messagesContainerRef = useRef(null);

//   const slides = messages
//     .filter((message) => message.contentType === 'image')
//     .map((message) => ({ src: message.body }));

//   const lightbox = useLightBox(slides);

//   useEffect(() => {
//     // Scroll to the bottom of the messages box when messages change
//     if (messagesContainerRef.current) {
//       messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <>
//       <Scrollbar
//         ref={(node) => {
//           messagesContainerRef.current = node;
//           messagesEndRef.current = node;
//         }}
//         sx={{ px: 3, py: 0, margin: 0, height: 'auto', overflow: 'auto' }}
//       >
//         <Box>
//           {messages.map((message) => (
//             <ChatMessageItem
//               key={message.id}
//               message={message}
//               participants={participants}
//               onOpenLightbox={() => lightbox.onOpen(message.body)}
//             />
//           ))}
//         </Box>
//       </Scrollbar>

//       <Lightbox
//         index={lightbox.selected}
//         slides={slides}
//         open={lightbox.open}
//         close={lightbox.onClose}
//       />
//     </>
//   );
// }

// ChatMessageList.propTypes = {
//   messages: PropTypes.array,
//   participants: PropTypes.array,
// };

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Scrollbar from '../components/scrollbar';
import Lightbox, { useLightBox } from '../components/lightbox';
import ChatMessageItem from './chat-message-item';

export default function ChatMessageList({ messages = [], participants }) {
  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));
  const lightbox = useLightBox(slides);

  useEffect(() => {
    const chatBox = document.querySelector('#chatBox');
    if (chatBox) {
      chatBox.scrollTop = chatBox.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <Scrollbar
        id="chatBox"
        sx={{ px: 3, py: 0, margin: 0, height: 'auto', overflow: 'auto' }}
      >
        <Box>
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              participants={participants}
              onOpenLightbox={() => lightbox.onOpen(message.body)}
            />
          ))}
        </Box>
      </Scrollbar>

      <Lightbox
        index={lightbox.selected}
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
      />
    </>
  );
}

ChatMessageList.propTypes = {
  messages: PropTypes.array,
  participants: PropTypes.array,
};

