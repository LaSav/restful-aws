// Conditional rendering for admin and member
// admin should see options for editing
// member should see options for attending, unattending

import { useParams } from 'react-router-dom';
import { useFetchEventQuery } from '../slices/eventsApiSlice';
import Loader from '../components/Loader';
import EventDetails from '../components/EventDetails';
import { Container } from 'react-bootstrap';

function ShowEventScreen() {
  const { eventId } = useParams();
  const { data: event, error, isLoading } = useFetchEventQuery(eventId);
  console.log(event);

  let eventDetails;
  if (isLoading) {
    return <Loader />;
  } else if (error) {
    eventDetails = <div>Error Loading event</div>;
  } else {
    eventDetails = <EventDetails event={event} />;
  }

  return (
    <Container className='d-flex justify-content-center pt-5'>
      {eventDetails}
    </Container>
  );
}

export default ShowEventScreen;
