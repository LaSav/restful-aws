import { Form } from 'react-bootstrap';
import { useState } from 'react';

function AddFriendsForm() {
  const [invitedUsernames, setInvitedUsernames] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <Form className='w-75' onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='invitedUsernames'>
        <Form.Label>Invite Users</Form.Label>
        <Form.Control
          style={{ border: 'none' }}
          type='text'
          placeholder='Enter Usernames seperated by a comma: savva,luna,iceberg'
          value={invitedUsernames}
          onChange={(e) => setInvitedUsernames(e.target.value)}
        ></Form.Control>
      </Form.Group>
    </Form>
  );
}

export default AddFriendsForm;
