import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// routes
import { paths } from '../routes/paths';
import { useRouter } from '../routes/hooks';
// hooks
import { useMockedUser } from '../hooks/use-mocked-user';
import { useResponsive } from '../hooks/use-responsive';
// api
import { clickConversation } from '../api/chat';
//
import { useGetNavItem } from './hooks';
import React, { useState, useEffect } from 'react'; // import useState and useEffect


import cookie from 'react-cookies';

// ----------------------------------------------------------------------

export default function ChatNavItem({ selected, collapse, conversation, onCloseMobile }) {
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
  const [numberOfUnread, setNumberOfUnread] = useState(0);

  const countUnreadMessages = () => {
    let count = 0;
    conversation.messages.forEach((message) => {
      if (message.senderId !== parseInt(user.id) && message.status === 'unseen') {
        count++;
      }
    });
    return count;
  };

  // Use an effect to set the unread count when the component mounts or when 'conversation' changes
  useEffect(() => {
    setNumberOfUnread(countUnreadMessages());
  }, [conversation]); // Dependency array, re-run this effect if 'conversation' changes



  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const { group, displayName, displayText, participants, lastActivity, hasOnlineInGroup } =
    useGetNavItem({
      conversation,
      currentUserId: parseInt(user.id),
    });

  const singleParticipant = participants[0];

  const { name, avatarUrl, status } = singleParticipant;

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }

  
      await clickConversation(conversation.id,parseInt(user.id));
      
      router.push(`${paths.dashboard.chat}?id=${conversation.id}`);
    } catch (error) {
      console.error(error);
    }
  }, [conversation.id, mdUp, onCloseMobile, router]);

  const renderGroup = (
    <Badge
      variant={hasOnlineInGroup ? 'online' : 'invisible'}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
        {participants.slice(0, 2).map((participant) => (
          <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl} />
        ))}
      </AvatarGroup>
    </Badge>
  );

  const renderSingle = (
    <Badge key={status} variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
    </Badge>
  );

  
  return (
    <ListItemButton
      disableGutters
      onClick={handleClickConversation}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(selected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Badge
        color="error"
        overlap="circular"
        // badgeContent={collapse ? conversation.unreadCount : 0}
        badgeContent={numberOfUnread}
      >
        {group ? renderGroup : renderSingle}
      </Badge>

      {!collapse && (
        <>
          <ListItemText
            sx={{ ml: 2 }}
            primary={displayName}
            primaryTypographyProps={{
              noWrap: true,
              variant: 'subtitle2',
            }}
            // secondary={displayText}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              variant: conversation.unreadCount ? 'subtitle2' : 'body2',
              color: conversation.unreadCount ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false,
              })}
            </Typography>

            {!!conversation.unreadCount && (
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  bgcolor: 'info.main',
                  borderRadius: '50%',
                }}
              />
            )}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}

ChatNavItem.propTypes = {
  collapse: PropTypes.bool,
  conversation: PropTypes.object,
  onCloseMobile: PropTypes.func,
  selected: PropTypes.bool,
};
