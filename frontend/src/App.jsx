import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container className='my-3 py-5'>
        <Outlet />
      </Container>
    </>
  );
};

export default App;
