import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import Root from './routes/root';
import Meal from './routes/meal';
import Login from './routes/login';
import Signup from './routes/signup';
import Profile from './routes/profile';
import ForgotPassword from './routes/forgotpassword';
import ResetPassword from './routes/resetpassword';
import Dashboard from './routes/dashboard';
import Lookup from './routes/lookup';
import Staple from './routes/staple';
import Graph from './routes/graph';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// Removed unused ref, replaced with boolean to decide whether route is protected
export const routes = [
  {
    path: '/login',
    element: <Login />,
    protected: false,
  },
  {
    path: '/meal',
    element: <Meal />,
    protected: true,
  },
  {
    path: '/signup',
    element: <Signup />,
    protected: false,
  },
  {
    path: '/profile',
    element: <Profile />,
    protected: true,
  },
  {
    path: '/forgotpassword',
    element: <ForgotPassword />,
    protected: false,
  },
  {
    path: '/resetpassword',
    element: <ResetPassword />,
    protected: true,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    protected: true,
  },
  {
    path: '/lookup',
    element: <Lookup />,
    protected: true,
  },
  {
    path: '/staple',
    element: <Staple />,
    protected: true,
  },
  {
    path: '/graph',
    element: <Graph />,
    protected: true,
  },
];

// Check if token in client localstorage
export function getToken() {
  return localStorage.getItem('token') ?? null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: routes.map((route) => ({
      index: route.path === '/',
      path: route.path === '/' ? undefined : route.path,
      element: route.element,
      // https://reactrouter.com/en/main/route/loader
      // Function that's run on every route, using this to protect routes from users who aren't logged in
      loader: () => {
        if (route.protected) {
          const loggedIn = getToken();
          if (!loggedIn) {
            throw redirect('/login');
          }
        }
        
        return {};
      },
    })),
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>,
);

// export const routes = [
//   {
//     path: '/login',
//     element: <Login />,
//     nodeRef: createRef(),
//   },
//   {
//     path: '/meal',
//     element: <Meal />,
//     nodeRef: createRef(),
//   },
//   {
//     path: '/signup',
//     element: <Signup />,
//     nodeRef: createRef(),
//   },
//   {
//     path: '/profile',
//     element: <Profile />,
//     nodeRef: createRef(),
//   },
//   {
//     path: '/resetpassword',
//     element: <ResetPassword />,
//     nodeRef: createRef(),

//   },
//   {
//     path: '/dashboard',
//     element: <Dashboard />,
//     nodeRef: createRef(),

//   },

// ];

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Root />,
//     children: routes.map((route) => ({
//       index: route.path === '/',
//       path: route.path === '/' ? undefined : route.path,
//       element: route.element,
//     })),
//   },
// ]);

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// );

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>,
// );
