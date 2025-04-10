// src/utils/authUtils.ts
interface User {
    name: string;
    email: string;
  }
  
  export const mockLogin = (email: string): User => {
    const user = { name: 'Usuário Teste', email };
    localStorage.setItem('@CaldeiraoCreativo:token', 'mock-jwt-token');
    localStorage.setItem('@CaldeiraoCreativo:user', JSON.stringify(user));
    return user;
  };
  
  export const mockLogout = (): void => {
    localStorage.removeItem('@CaldeiraoCreativo:token');
    localStorage.removeItem('@CaldeiraoCreativo:user');
  };
  
  export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('@CaldeiraoCreativo:token');
  };
  
  export const getCurrentUser = (): User | null => {
    const userString = localStorage.getItem('@CaldeiraoCreativo:user');
    return userString ? JSON.parse(userString) : null;
  };