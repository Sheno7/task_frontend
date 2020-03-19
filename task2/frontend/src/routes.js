import React from 'react';
import AuthMiddleware from './middleware/AuthMiddleware'

const Home = React.lazy(() => import('./views/frontend/Home'));
const Cart = React.lazy(() => import('./views/frontend/Cart'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home',component:Home},
  { path: '/carts', exact: true, name: 'Carts',component:Cart,middleware:AuthMiddleware},
];

export default routes;
