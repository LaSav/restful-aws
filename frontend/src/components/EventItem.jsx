import { Col, Badge, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function EventItem({ event }) {
  return (
    <LinkContainer
      style={{
        borderLeft: 'solid #8CDEE8 5px',
        borderRadius: '12px',
        backgroundColor: 'white',
      }}
      to={`/events/${event.id}`}
    >
      <Col className='my-2 p-3'>
        <h6>{event.name}</h6>
        <h6>{event.deadline}</h6>
        <h6>Available Spaces: {event.availableSpaces}</h6>
        <Stack direction='horizontal' className='justify-content-end' gap={2}>
          {event.userEvents.isAdmin ? (
            <Badge pill bg='info'>
              Admin
            </Badge>
          ) : null}
          {event.userEvents.isAttending ? (
            <Badge pill bg='info'>
              Attending
            </Badge>
          ) : null}
        </Stack>
      </Col>
    </LinkContainer>
  );
}

export default EventItem;
