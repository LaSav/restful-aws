// edit button placement
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
    return <li key={i}>{attendee}</li>;
  });

  const membersList = event.members.map((member, i) => {
    return <li key={i}>{member}</li>;
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
        <Col xs={7} className='my-2'>
          <div
            className='py-4 px-3'
            style={{
              backgroundColor: '#fafafa',
              borderRadius: '10px',
            }}
          >
            <h2>{event.deadline}</h2>
            <h3>{event.name}</h3>
            <Stack direction='horizontal' gap={2}>
              {event.isAdmin ? (
                <h5>
                  <Badge pill bg='info'>
                    Admin
                  </Badge>
                </h5>
              ) : null}
              {event.isAttending ? (
                <h5>
                  <Badge pill bg='info'>
                    Attending
                  </Badge>
                </h5>
              ) : null}
            </Stack>
            <h5 className='my-3'>{event.description}</h5>
            {event.isAdmin ? (
              <LinkContainer to={`/update/${event.id}`}>
                <Button variant='outline-primary' className='me-3'>
                  Edit
                </Button>
              </LinkContainer>
            ) : null}
          </div>
          <Stack className='my-5' direction='horizontal'>
            <Stack>
              <h5 className='text-center'>
                Going <Badge pill>{attendeesList.length}</Badge>
              </h5>
              <ul style={{ listStyle: 'none' }} className='text-center'>
                {attendeesList}
              </ul>
            </Stack>
            <Stack>
              <h5 className='text-center'>
                Invited <Badge pill>{membersList.length}</Badge>
              </h5>
              <ul style={{ listStyle: 'none' }} className='text-center'>
                {membersList}
              </ul>
            </Stack>
          </Stack>
        </Col>
        <Col xs={5} className='my-2'>
          <Stack className='my-5 text-center' direction='horizontal'>
            <Stack>
              <h5>Total Spaces</h5>
              <h4>
                <Badge pill>{event.totalSpaces}</Badge>
              </h4>
            </Stack>
            <Stack>
              <h5>Spaces Left</h5>
              <h4>
                <Badge pill>{event.availableSpaces}</Badge>
              </h4>
            </Stack>
          </Stack>
          <Stack className='col-md-8 mx-auto' gap={2}>
            {event.isAttending ? (
              <Button variant='warning' className='me-3'>
                Un-attend
              </Button>
            ) : (
              <Button className='me-3' onClick={attendHandler}>
                Attend
              </Button>
            )}
            <Button variant='danger' className='me-3' onClick={leaveHandler}>
              Leave Event
            </Button>
          </Stack>
        </Col>
      </Row>
    </>
  );
}

export default EventDetails;
