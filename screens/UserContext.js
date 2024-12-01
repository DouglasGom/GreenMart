import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'Cakegoth',
    email: 'exemplo@email.com',
    profilePhoto: null, // Pode ser um URL ou require para uma imagem local
  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
