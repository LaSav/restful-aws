// Conditional rendering for admin and member
// admin should see options for editing
// member should see options for attending, unattending

import { useParams } from 'react-router-dom';
import {
  useFetchEventQuery,
  useAttendEventMutation,
} from '../slices/eventsApiSlice';
import Loader from '../components/Loader';
import EventDetails from '../components/EventDetails';
import { Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function ShowEventScreen() {
  const { eventId } = useParams();
  const { data: event, error, isLoading } = useFetchEventQuery(eventId);
  const [attendEvent, { isLoading: attendLoading }] =
    useAttendEventMutation(eventId);

  const attendHandler = async () => {
    try {
      await attendEvent(eventId).unwrap();
      toast.success(`You are set to attend ${event.name} on ${event.deadline}`);
      // navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  let eventDetails;
  if (isLoading) {
    return <Loader />;
  } else if (error) {
    eventDetails = <div>Error Loading event</div>;
  } else {
    eventDetails = <EventDetails event={event} />;
  }

  return (
    <Container>
      {eventDetails}
      {event.isAttending ? (
        <Button className='me-3'>Un-attend</Button>
      ) : (
        <Button className='me-3' onClick={attendHandler}>
          Attend
        </Button>
      )}
      {event.isAdmin ? (
        <LinkContainer to={`/update/${event.id}`}>
          <Button>Edit</Button>
        </LinkContainer>
      ) : null}
    </Container>
  );
}

export default ShowEventScreen;
