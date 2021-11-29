// import React, {useEffect} from 'react';
// import {Route, Redirect} from 'react-router-dom';
// import { useAuth0 } from '@auth0/auth0-react';

// const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
//     return (
//       <Route
//         {...rest}
//         render={
//           ({ location }) => (
//             isAuthenticated
//               ? (
//                 children
//               ) : (
//                 <Redirect
//                   to={{
//                     pathname: '/login',
//                     state: { from: location }
//                   }}
//                 />
//               ))
//         }
//       />
//     );
// }