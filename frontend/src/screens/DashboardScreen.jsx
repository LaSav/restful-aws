import { Container, Row, Col, Stack } from 'react-bootstrap';
import Loader from '../components/Loader';
import { useFetchEventsQuery } from '../slices/eventsApiSlice';
import EventItem from '../components/EventItem';

const DashboardScreen = () => {
  const { data: events, error, isLoading } = useFetchEventsQuery();

  let eventsList;
  if (isLoading) {
    eventsList = <Loader />;
  } else if (error) {
    eventsList = <div>Error Loading Events</div>;
  } else {
    eventsList = events.map((event) => {
      return <EventItem key={event.id} event={event} />;
    });
  }

  return (
    <Container fluid className='pt-5'>
      <Row className='d-flex justify-content-center'>
        <Col md={4}>
          {events?.length > 0 ? (
            <>
              <h3 className='mb-3'>Your Events</h3>
              <Stack className='mx-auto' gap={3}>
                {eventsList}
              </Stack>
            </>
          ) : (
            <h1>You aren't in any events yet.</h1>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardScreen;
