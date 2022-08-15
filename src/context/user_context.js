import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const { loginWithRedirect, logout, user } = useAuth0();
  const [userClient, setUserClient] = useState(null);
  useEffect(() => {
    setUserClient(user);
  }, [user]);
  return (
    <UserContext.Provider value={{ loginWithRedirect, logout, userClient }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
