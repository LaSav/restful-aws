import { Button, Container, Row, Col, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useFetchEventsQuery } from '../slices/eventsApiSlice';
import EventItem from '../components/EventItem';

const DashboardScreen = () => {
  console.log('Dashboard screen rendering');

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
    <Container className='pt-5 d-flex justify-content-center'>
      <Row>
        <Col>
          {events?.length > 0 ? (
            <>
              <h3 className='mb-3'>Events you've been invited to</h3>
              <Stack className='mx-auto' gap={3}>
                <h4>Date Sort</h4>
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
