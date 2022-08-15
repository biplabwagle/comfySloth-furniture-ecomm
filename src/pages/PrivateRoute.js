import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children }) => {
  const { userClient } = useUserContext();
  /*
   *if user client does exists, which only happens after auth0
   *authentication, then return children which in this case is
   *checkout page
   */
  if (userClient) {
    return children;
  }
  //otherwise return the user to the landing page
  return <Navigate to="/" redirect={true} />;
};
export default PrivateRoute;
