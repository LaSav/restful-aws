import { Card, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function EventItem({ event }) {
  return (
    <LinkContainer to={`/events/${event.id}`}>
      <Card className='bg-light w-50'>
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Subtitle>{event.deadline}</Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
          <ListGroup horizontal>
            <ListGroup.Item>Admin</ListGroup.Item>
            <ListGroup.Item>Attending</ListGroup.Item>
            <ListGroup.Item>Number of members</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default EventItem;
