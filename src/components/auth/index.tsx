import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  isLogged: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [isLogged, setIsLogged] = useState(true);

  const login = () => {
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
