import React, { createContext } from 'react';

// Create the Auth Context
export const authContext = createContext();

// Authentication Provider
export function ProvideAuth({ children }) {
  const storedValue = localStorage.getItem('user');
  const user = storedValue ? JSON.parse(storedValue) : null;
  return (
    <authContext.Provider value={user}>
      {children}
    </authContext.Provider>
  );
}
