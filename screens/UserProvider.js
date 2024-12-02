import React, { createContext, useState, useContext } from 'react';


const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); 


  React.useEffect(() => {

    setTimeout(() => {
      setUser({
        email: 'usuario@exemplo.com',
        name: 'Usuário Exemplo',
      });
    }, 2000); 
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => {
  return useContext(UserContext);
};
