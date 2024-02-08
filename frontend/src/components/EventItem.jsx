import { Card, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function EventItem({ event }) {
  return (
    <LinkContainer to={`/events/${event.id}`}>
      <Card>
        <Card.Body>
          <Card.Title>{event.name}</Card.Title>
          <Card.Subtitle>{event.deadline}</Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
          <ListGroup horizontal>
            <ListGroup.Item>
              {event.userEvents.isAdmin ? <p>Admin</p> : null}
            </ListGroup.Item>
            <ListGroup.Item>
              {event.userEvents.isAdttending ? <p>Attending</p> : null}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default EventItem;
