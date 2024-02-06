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
    <Container>
      <Row>
        <Col className='pb-4 justify-content-end'>
          <LinkContainer to='/create'>
            <Button type='submit' variant='primary' className='mt-3'>
              Create Event
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      <Row>
        <Stack className='mx-auto' gap={3}>
          {eventsList}
        </Stack>
      </Row>
    </Container>
  );
};

export default DashboardScreen;
