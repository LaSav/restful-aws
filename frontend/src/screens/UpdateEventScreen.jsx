// Validation: successful update notifications

import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useUpdateEventMutation,
  useFetchEventQuery,
} from '../slices/eventsApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useEffect } from 'react';

function UpdateEventScreen() {
  const { eventId } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [availableSpaces, setAvailableSpaces] = useState('');
  const [invitedUsernames, setInvitedUsernames] = useState([]);

  const navigate = useNavigate();

  const { data: event, isLoading } = useFetchEventQuery(eventId);
  const [updateEvent, { isLoading: updateLoading }] = useUpdateEventMutation();

  useEffect(() => {
    if (event) {
      setName(event.name || '');
      setDescription(event.description || '');
      setDeadline(event.deadline || '');
      setAvailableSpaces(event.availableSpaces || '');
    }
  }, [event]);

  const submitHandler = async (e) => {
    e.preventDefault();

    console.log(name);

    try {
      const res = await updateEvent({
        id: eventId,
        data: {
          name: name,
          description: description,
          deadline: deadline,
          availableSpaces: availableSpaces,
          invitedUsernames: invitedUsernames,
        },
      }).unwrap();
      navigate(`/events/${eventId}`);
    } catch (err) {
      toast.error(err?.data?.error || err.error);
    }
  };

  if (isLoading || updateLoading) {
    return <Loader />;
  }

  return (
    <FormContainer>
      <h1>Edit Event</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            required
            placeholder='Name of Event'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='text'
            required
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
            required
            placeholder='Choose a Date'
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='availbleSpaces'>
          <Form.Label>Set Available Spaces</Form.Label>
          <Form.Control
            type='number'
            required
            min={1}
            value={availableSpaces}
            onChange={(e) => setAvailableSpaces(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='invitedUsernames'>
          <Form.Label>Invite Users</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Usernames seperated by a comma: savva,luna,iceberg'
            value={invitedUsernames}
            onChange={(e) => setInvitedUsernames(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Save Changes
        </Button>
      </Form>
    </FormContainer>
  );
}

export default UpdateEventScreen;
