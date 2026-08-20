import { createContext, useContext, useState, useMemo, useCallback } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Optimizamos las funciones con useCallback para que no se recreen en cada render
  const login = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Optimizamos el valor del contexto con useMemo para evitar re-renders innecesarios de los consumidores
  const value = useMemo(() => ({
    isAuthenticated,
    login,
    logout
  }), [isAuthenticated, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
