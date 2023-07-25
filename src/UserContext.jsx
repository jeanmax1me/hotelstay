import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        if (!user) {
          const response = await axios.get('/profile');
          setUser(response.data);
          setReady(true);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }

    fetchUserProfile();
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    setReady(true);
  };

  return (
    <UserContext.Provider value={{ user, setUser, ready, login }}>
      {children}
    </UserContext.Provider>
  );
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
