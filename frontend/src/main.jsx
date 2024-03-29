import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import HomeScreen from './screens/HomeScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import DashboardScreen from './screens/DashboardScreen.jsx';
import store from './store.js';
import { Provider } from 'react-redux';
import PrivateRoute from './components/PrivateRoute.jsx';
import CreateEventScreen from './screens/CreateEventScreen.jsx';
import ShowEventScreen from './screens/ShowEventScreen.jsx';
import UpdateEventScreen from './screens/UpdateEventScreen.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Private Routes */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/dashboard' element={<DashboardScreen />} />
      </Route>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/create' element={<CreateEventScreen />} />
      </Route>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/events/:eventId' element={<ShowEventScreen />} />
      </Route>
      <Route path='' element={<PrivateRoute />}>
        <Route path='/update/:eventId' element={<UpdateEventScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
