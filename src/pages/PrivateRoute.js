import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// will remove later
import { useUserContext } from '../context/user_context';

const PrivateRoute = ({ children }) => {
  //A bug prevents navigation to protected routes when using the state value form use userContext so, the remedy is to access the useAuth0 right here and see if the user exists.
  const { user } = useAuth0();
  /*
   *if user client does exists, which only happens after auth0
   *authentication, then return children which in this case is
   *checkout page
   */
  if (user) {
    return children;
  }
  //otherwise return the user to the landing page
  return <Navigate to="/" redirect={true} />;
};
export default PrivateRoute;
