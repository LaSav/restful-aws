import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useFetchEventsQuery } from '../slices/eventsApiSlice';
import { setUserEvents } from '../slices/eventsSlice';

const DashboardScreen = () => {
  console.log('Dashboard screen rendering');
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { data: events, error, isLoading } = useFetchEventsQuery();
  const { userEvents } = useSelector((state) => state.events);

  console.log(events);

  useEffect(() => {
    if (!error) {
      dispatch(setUserEvents(events));
    }
  }, [dispatch, events, error]);

  return <h1>Dashboard</h1>;
};

export default DashboardScreen;
