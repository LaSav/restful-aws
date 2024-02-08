import { Container, Card, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className=' py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>
            A web-app for creating events with friends.
          </h1>
          <p className='text-center mb-4'>
            Create an event, then invite your friends to join.
          </p>
          <div className='d-flex'>
            {userInfo ? (
              <>
                <LinkContainer to='/dashboard'>
                  <Button className='me-3'>Go to Dashboard</Button>
                </LinkContainer>
                <LinkContainer to='/create'>
                  <Button>Create an Event</Button>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to='/login'>
                  <Button className='me-3'>Sign In</Button>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Button>Sign Up</Button>
                </LinkContainer>
              </>
            )}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
