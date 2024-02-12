import { Col, Badge, Stack, Button } from 'react-bootstrap';

function EventDetails({ event }) {
  const attendeesList = event.attendees.map((attendee, i) => {
    return <p key={i}>{attendee}</p>;
  });

  const membersList = event.members.map((member, i) => {
    return <p key={i}>{member}</p>;
  });

  return (
    // <Card className='d-flex bg-light w-50 align-items-center py-4'>
    //   <Card.Body>
    //     <Card.Title>{event.name}</Card.Title>
    //     <Card.Subtitle>Deadline: {event.deadline}</Card.Subtitle>
    //     <Card.Text>{event.description}</Card.Text>
    //     <Card.Text>Total Spaces: {event.availableSpaces}</Card.Text>
    //     <Card.Text>
    //       Spaces left: {event.availableSpaces - event.attendees.length}
    //     </Card.Text>
    //     <ListGroup className='py-3'>
    //       <ListGroup.Item>Attending:</ListGroup.Item>
    //       {attendeesList}
    //     </ListGroup>
    //     <ListGroup>
    //       <ListGroup.Item>Members:</ListGroup.Item>
    //       {membersList}
    //     </ListGroup>
    //   </Card.Body>
    //   <div className='d-flex'>
    //     {event.isAdmin ? (
    //       <LinkContainer to={`/update/${event.id}`}>
    //         <Button className='me-3'>Edit</Button>
    //       </LinkContainer>
    //     ) : null}
    //     {event.isAttending ? (
    //       <Button>Un-attend</Button>
    //     ) : (
    //       <Button>Attend</Button>
    //     )}
    //   </div>
    // </Card>
    <Col className='my-2 p-3'>
      <h3>{event.name}</h3>
      <h4>{event.deadline}</h4>
      <h5>Total Spaces: {event.totalSpaces}</h5>
      <h5>Spaces left: {event.availableSpaces}</h5>
      <h5>{event.description}</h5>
      <Stack direction='horizontal' gap={2}>
        {event.isAdmin ? (
          <Badge pill bg='info'>
            Admin
          </Badge>
        ) : null}
        {event.isAttending ? (
          <Badge pill bg='info'>
            Attending
          </Badge>
        ) : null}
      </Stack>
      <Stack gap={2}>
        <h3>Going</h3>
        {attendeesList}
      </Stack>
      <Stack gap={2}>
        <h3>Members</h3>
        {membersList}
      </Stack>
    </Col>
  );
}

export default EventDetails;
