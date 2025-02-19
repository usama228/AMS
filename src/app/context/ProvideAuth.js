import React, { createContext } from 'react';
export const authContext = createContext();
export function ProvideAuth({ children }) {
  const storedValue = localStorage.getItem('user');
  const user = storedValue ? JSON.parse(storedValue) : null;
  return (
    <authContext.Provider value={user}>
      {children}
    </authContext.Provider>
  );
}
