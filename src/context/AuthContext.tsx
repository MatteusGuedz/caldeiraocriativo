import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import ImgAvatar from '../Assets/images/avatar.jpg';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorageData = () => {
      const storedUser = localStorage.getItem('@App:user');
      const storedToken = localStorage.getItem('@App:token');

      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
      
      setLoading(false);
    };

    loadStorageData();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulando uma requisição de login
      // Em produção, aqui seria a chamada para API
      setLoading(true);
      
      // Simular um delay para parecer que estamos fazendo uma requisição
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Para testes, qualquer e-mail com senha "senha123" vai logar
      if (password === 'senha123') {
        const userData: User = {
          id: '1',
          name: email.split('@')[0], // Nome baseado no e-mail
          email,
          avatar: ImgAvatar,
          role: email.includes('admin') ? 'admin' : 'user'
        };
        
        setUser(userData);
        
        localStorage.setItem('@CaldeiraoCreativo:user', JSON.stringify(userData));
        localStorage.setItem('@CaldeiraoCreativo:token', 'token-fake-para-testes');
        
        setLoading(false);
        return true;
      }
      
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Erro ao fazer login', error);
      setLoading(false);
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem('@App:user');
    localStorage.removeItem('@App:token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}