import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container, Row, Col, Stack } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useFetchEventsQuery } from '../slices/eventsApiSlice';
import { setUserEvents } from '../slices/eventsSlice';
import EventItem from '../components/EventItem';

const DashboardScreen = () => {
  console.log('Dashboard screen rendering');
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { data: events, error, isLoading } = useFetchEventsQuery();
  const { userEvents } = useSelector((state) => state.events);

  console.log(userEvents);

  useEffect(() => {
    if (!error) {
      dispatch(setUserEvents(events));
    }
  }, [dispatch, events, error]);

  if (isLoading) {
    return <Loader />;
  }

  const eventsList = events.map((event) => {
    return <EventItem key={event.id} event={event} />;
  });

  return (
    <div className='py-5'>
      <Container>
        <Row className='justify-content-end'>
          <Col className='pb-4'>
            <LinkContainer to='/create'>
              <Button type='submit' variant='primary' className='mt-3'>
                Create Event
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Stack gap={3}>{eventsList}</Stack>
      </Container>
    </div>
  );
};

export default DashboardScreen;
