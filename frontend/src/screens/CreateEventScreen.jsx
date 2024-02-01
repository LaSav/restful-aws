// Add multiple usernames option to form input

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateEventMutation } from '../slices/eventsApiSlice';
import { setCreatedEvent } from '../slices/eventsSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

function CreateEventScreen() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [availableSpaces, setAvailableSpaces] = useState('');
  const [invitedUsernames, setInvitedUsernames] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createEvent, { isLoading }] = useCreateEventMutation();

  const { createdEvent } = useSelector((state) => state.events);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createEvent({
        name,
        description,
        deadline,
        availableSpaces,
        invitedUsernames,
      }).unwrap();
      dispatch(setCreatedEvent({ ...res }));
      navigate('/dashboard');
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Create an Event</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Name of Event'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter a short description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            as='textarea'
            rows={3}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='deadline'>
          <Form.Label>Set a Date</Form.Label>
          <Form.Control
            type='date'
            placeholder='Choose a Date'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='availbleSpaces'>
          <Form.Label>Set Available Spaces</Form.Label>
          <Form.Control
            type='number'
            placeholder='1'
            value={availableSpaces}
            onChange={(e) => setAvailableSpaces(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='invitedUsernames'>
          <Form.Label>Invite Users</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Usernames'
            value={invitedUsernames}
            onChange={(e) => setInvitedUsernames(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Create Event
        </Button>
      </Form>
    </FormContainer>
  );
}

export default CreateEventScreen;
