import PropTypes from 'prop-types';
// @mui
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';
// utils
import { fToNow } from '../utils/format-time';
// components
import Iconify from '../components/iconify';
import {socket} from './socketClient'
import { useState,useEffect } from 'react';

// ----------------------------------------------------------------------

export default function ChatHeaderDetail({ participants }) {

  // socket.emit('get Participant info', participants[0].userId)
  // socket.on('send-participant-info back from server', (data) => {
  //   console.log('daaaataaa',data)
  // })

  


  // const [participantData, setParticipantData] = useState(null);
  // const group = participants.length > 1;
  // const singleParticipant = participantData;

  // useEffect(() => {
  //   socket.emit('get Participant info', participants[0].userId)
  //   socket.on('send-participant-info back from server', (data) => {
  //     setParticipantData(data)
  //   })
  // }, [participants]) 


const group = participants.length > 1;
  const singleParticipant = participants[0];

 
  const renderGroup = (
    <AvatarGroup
      max={3}
      sx={{
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 32,
          height: 32,
        },
      }}
    >
      {participants.map((participant) => (
        <Avatar key={participant.id} alt={participant.username} src={participant.avatarUrl} />
      ))}
    </AvatarGroup>
  );

  const renderSingle =
  // participantData &&
   (
    <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
      <Badge
        variant={singleParticipant.status}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar src={'https://i.pinimg.com/originals/53/86/5c/53865ca313303682b3c1ec659fdd1695.jpg'} alt={singleParticipant.username} />
      </Badge>

      <ListItemText
        primary={singleParticipant.username}
        secondary={
          singleParticipant.status === 'offline'
            ? fToNow(singleParticipant.lastActivity)
            : singleParticipant.status
        }
        secondaryTypographyProps={{
          component: 'span',
          ...(singleParticipant.status !== 'offline' && {
            textTransform: 'capitalize',
          }),
        }}
      />
    </Stack>
  );

  return (
    <>
      {group ? renderGroup : renderSingle}

      <Stack flexGrow={1} />

      <IconButton>
        <Iconify icon="solar:phone-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="solar:videocamera-record-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </>
  );
}

ChatHeaderDetail.propTypes = {
  participants: PropTypes.array,
};
