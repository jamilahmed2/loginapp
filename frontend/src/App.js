import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// <!-- ========== Components  ========== -->
import { Register } from './components/Register';
import { Profile } from './components/Profile';
import { Username } from './components/Username';
import { Password } from './components/Password';
import { Reset } from './components/Reset';
import { Recovery } from './components/Recovery';
import { NotFound } from './components/NotFound';

// <!-- ========== Root Routes  ========== -->
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/password',
    element: <Password></Password>
  },
  {
    path: '/profile',
    element: <Profile></Profile>
  },
  {
    path: '/reset',
    element: <Reset></Reset>
  },
  {
    path: '/recovery',
    element: <Recovery></Recovery>
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  },
])

function App() {
  // <!-- ========== App Title  ========== -->
  document.title = "Login App"
  // <!-- ========== ---  ========== -->
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
