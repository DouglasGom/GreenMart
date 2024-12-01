import React, { createContext, useState, useContext } from 'react';

// Cria o contexto do usuário
const UserContext = createContext();

// Provedor do contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Inicializa o estado do usuário como `null`

  // Exemplo: simula o carregamento dos dados do usuário
  React.useEffect(() => {
    // Simula um carregamento de dados (pode ser substituído por uma chamada de API)
    setTimeout(() => {
      setUser({
        email: 'usuario@exemplo.com',
        name: 'Usuário Exemplo',
      });
    }, 2000); // Simula um delay de 2 segundos
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para facilitar o consumo do contexto
export const useUser = () => {
  return useContext(UserContext);
};
