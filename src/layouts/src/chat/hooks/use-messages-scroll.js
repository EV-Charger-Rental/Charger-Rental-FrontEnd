import { useCallback, useEffect, useRef } from 'react';

export default function useMessagesScroll(messages) {
  const messagesEndRef = useRef(null);

  const scrollMessagesToBottom = useCallback(() => {
    const current = messagesEndRef.current;
    console.log('Current Ref: ', current);
    if(current) {
      console.log('scrollHeight: ', current.scrollHeight, 'scrollTop: ', current.scrollTop);
      current.scrollTop = current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    console.log('Messages:', messages);
    scrollMessagesToBottom();
  }, [messages, scrollMessagesToBottom]);

  return {
    messagesEndRef,
  };
}

