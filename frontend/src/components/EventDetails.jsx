import { Card, ListGroup, Button } from 'react-bootstrap';

function EventDetails({ event }) {
  console.log(event.members);
  const attendeesList = event.attendees.map((attendee, i) => {
    return <ListGroup.Item key={i}>{attendee}</ListGroup.Item>;
  });

  const membersList = event.members.map((member, i) => {
    return <ListGroup.Item key={i}>{member}</ListGroup.Item>;
  });

  return (
    <Card className='d-flex bg-light w-50 align-items-center py-4'>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Subtitle>Deadline: {event.deadline}</Card.Subtitle>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>Total Spaces: {event.availableSpaces}</Card.Text>
        <Card.Text>
          Spaces left: {event.availableSpaces - event.attendees.length}
        </Card.Text>
        <ListGroup className='py-3'>
          <ListGroup.Item>Attending:</ListGroup.Item>
          {attendeesList}
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>Members:</ListGroup.Item>
          {membersList}
        </ListGroup>
      </Card.Body>
      <div className='d-flex'>
        {event.isAdmin ? <Button className='me-3'>Edit</Button> : null}
        {event.isAttending ? (
          <Button>Un-attend</Button>
        ) : (
          <Button>Attend</Button>
        )}
      </div>
    </Card>
  );
}

export default EventDetails;
