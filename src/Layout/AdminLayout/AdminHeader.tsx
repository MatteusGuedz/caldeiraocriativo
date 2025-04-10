// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface User {
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Efeito para carregar usuário do localStorage ao iniciar
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('@CaldeiraoCreativo:user');
      const storedToken = localStorage.getItem('@CaldeiraoCreativo:token');
      
      if (storedUser && storedToken) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          name: parsedUser.name,
          email: parsedUser.email,
          avatar: parsedUser.avatar || '/default-avatar.png'
        });
      }
    } catch (error) {
      console.error('Erro ao carregar usuário do localStorage:', error);
    } finally {
      // Certifique-se de que o loading seja sempre definido como false
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Simulação de login simples
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const userData = { 
        name: 'Usuário Teste', 
        email,
        avatar: '/default-avatar.png'
      };
      const token = 'mock-jwt-token';
      
      localStorage.setItem('@CaldeiraoCreativo:token', token);
      localStorage.setItem('@CaldeiraoCreativo:user', JSON.stringify(userData));
      
      setUser(userData);
      return;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('@CaldeiraoCreativo:token');
    localStorage.removeItem('@CaldeiraoCreativo:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      signed: !!user, 
      user, 
      loading, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}