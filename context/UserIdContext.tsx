import React, { createContext, useContext, useState } from 'react';

const UserIdContext : any  = createContext(undefined);

export const UserIdProvider: any = ({ children } : any ) => {
  const [userId, setUserId] = useState(undefined);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

export const useUserId = () => {
  const context = useContext(UserIdContext);
  if (!context) {
    throw new Error('useUserId must be used within a UserIdProvider');
  }
  return context;
}; 