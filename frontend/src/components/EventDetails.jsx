// Create components for 'spaces left', 'total spaces', buttons, date and list of members and attendees
import { Col, Badge, Stack, Row, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import {
  useAttendEventMutation,
  useLeaveEventMutation,
} from '../slices/eventsApiSlice';
import { toast } from 'react-toastify';

function EventDetails({ event }) {
  const navigate = useNavigate();

  const attendeesList = event.attendees.map((attendee, i) => {
    return <p key={i}>{attendee}</p>;
  });

  const membersList = event.members.map((member, i) => {
    return <p key={i}>{member}</p>;
  });

  const [attendEvent, { isLoading: attendEventLoading }] =
    useAttendEventMutation(event.id);
  const [leaveEvent, { isLoading: leaveEventLoading }] = useLeaveEventMutation(
    event.id
  );

  const attendHandler = async () => {
    try {
      await attendEvent(event.id).unwrap();
      toast.success(`You are set to attend ${event.name} on ${event.deadline}`);
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  const leaveHandler = async () => {
    try {
      await leaveEvent(event.id).unwrap();
      toast.success(`You have left ${event.name}`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  return (
    <>
      <Row>
        <Col className='my-2'>
          <Stack direction='horizontal' gap={3}>
            <h3>{event.name}</h3>
            {event.isAdmin ? (
              <LinkContainer to={`/update/${event.id}`}>
                <Button variant='outline-primary' className='me-3'>
                  Edit
                </Button>
              </LinkContainer>
            ) : null}
          </Stack>
          <Stack direction='horizontal' gap={2}>
            {event.isAdmin ? (
              <Badge pill bg='info'>
                Admin
              </Badge>
            ) : null}
            {event.isAttending ? (
              <Badge pill bg='info'>
                Attending
              </Badge>
            ) : null}
          </Stack>
          <h5>{event.description}</h5>
          <Stack direction='horizontal' gap={2}>
            <h5>Total Spaces: {event.totalSpaces}</h5>
            <h5>Spaces left: {event.availableSpaces}</h5>
          </Stack>
        </Col>
        <Col className='my-2'>
          <h4>{event.deadline}</h4>
          <Stack direction='horizontal'>
            <Stack gap={2}>
              <h5>Going</h5>
              {attendeesList}
            </Stack>
            <Stack gap={2}>
              <h5>Members</h5>
              {membersList}
            </Stack>
          </Stack>
          <Stack direction='horizontal' gap={3}>
            {event.isAttending ? (
              <Button variant='outline-warning' className='me-3'>
                Un-attend
              </Button>
            ) : (
              <Button className='me-3' onClick={attendHandler}>
                Attend
              </Button>
            )}
            <Button
              variant='outline-danger'
              className='me-3'
              onClick={leaveHandler}
            >
              Leave Event
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default EventDetails;
